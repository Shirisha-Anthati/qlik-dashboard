import styles from "./Dashboard.module.css";
import { useReducer } from "react";
import { useEffect } from "react";

const filters = {
  region: "Region",
  department: "Department",
  screenId: "Screen Id",
  userName: "User Name",
  role: "Role",
};

const initialState = {
  region: {
    selectedValues: [],
    data: [],
  },
  department: {
    selectedValues: [],
    data: [],
  },
  screenId: {
    selectedValues: [],
    data: [],
  },
  userName: {
    selectedValues: [],
    data: [],
  },
  role: {
    selectedValues: [],
    data: [],
  },
  filterData: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "set_filter_data":
      return {
        ...state,
        region: {
          ...state.region,
          data: action.data.region,
        },
        department: {
          ...state.department,
          data: action.data.department,
        },
        screenId: {
          ...state.screenId,
          data: action.data.screenId,
        },
        userName: {
          ...state.userName,
          data: action.data.userName,
        },
        role: {
          ...state.role,
          data: action.data.role,
        },
      };
    case "save_filter_data":
      return {
        ...state,
        filterData: action.data,
      };
    case "set_selected_values":
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          selectedValues: [
            ...state[action.key].selectedValues,
            action.selectedValue,
          ],
        },
      };
    case "remove_unselected_values":
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          selectedValues: state[action.key].selectedValues.filter(
            (s) => s !== action.unselectedValue
          ),
        },
      };
    case "merge_filter_data":
      const newState = Object.entries(action.data).reduce((init, [k, v]) => {
        state[k].data = [...state[k].data, ...v];
        init[k] = state[k]
        return init
      }, {});
      return {
        ...state,
        ...newState,
      };
    default:
      console.log(action.type);
      throw new Error("action type not permitted");
  }
};

const reduceFilterData = (data) => {
  return data.reduce(
    (init, curr) => {
      for (const key of Object.keys(curr)) {
        if (!init[key].includes(curr[key])) {
          init[key] = [...init[key], curr[key]];
        }
      }
      return init;
    },
    { region: [], department: [], screenId: [], userName: [], role: [] }
  );
};
const DashboardPage = () => {
  console.log("re-rendered dashboard");
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchFilterData = async () => {
    const res = await fetch(`http://localhost:8080/api/utility/filters`);
    if (!res.ok) {
      return null;
    }
    let data = await res.json();
    dispatch({ type: "save_filter_data", data });
    data = reduceFilterData(data);
    dispatch({ type: "set_filter_data", data });
  };
  useEffect(() => {
    fetchFilterData();
  }, []);

  const handleCheckboxChange = (filterKey, e) => {
    console.log(filterKey, e.target.checked, e.target.id);
    if (
      e.target.checked &&
      !state[filterKey].selectedValues.includes(e.target.id)
    ) {
      dispatch({
        type: "set_selected_values",
        key: filterKey,
        selectedValue: e.target.id,
      });
      const filteredData = state.filterData.filter(
        (d) => d[filterKey] === e.target.id
      );
      dispatch({
        type: "set_filter_data",
        data: reduceFilterData(filteredData),
      });
    } else if (
      !e.target.checked &&
      state[filterKey].selectedValues.includes(e.target.id)
    ) {
      dispatch({
        type: "remove_unselected_values",
        key: filterKey,
        unselectedValue: e.target.id,
      });
      const filteredData = state.filterData.filter(
        (d) => d[filterKey] !== e.target.id
      );
      dispatch({
        type: "merge_filter_data",
        data: reduceFilterData(filteredData),
      });
    }
  };
  return (
    <div className={styles.wrapper}>
      <section className={styles.filters}>
        <div>
          <h1>Filters</h1>
          {Object.entries(filters).map(([k, v]) => {
            return (
              <div key={k} className={styles.accordian}>
                <div>
                  <span>{v}</span>
                </div>
                <ul role="list" data-open={state[k].isOpen}>
                  {state[k].data.map((d) => {
                    return (
                      <div
                        key={k + d.toLowerCase()}
                        className={styles.filterItem}
                      >
                        <input
                          type="checkbox"
                          name={d.toLowerCase()}
                          id={d}
                          onChange={(e) => handleCheckboxChange(k, e)}
                          defaultChecked={state[k].selectedValues.includes(d)}
                        />
                        <label htmlFor={d}>{d}</label>
                      </div>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
      <section>{state.region.isOpen}</section>
    </div>
  );
};

export default DashboardPage;
