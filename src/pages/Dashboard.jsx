import { useReducer, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './Dashboard.module.css';

const filters = {
  region: 'Region',
  category: 'Category',
  screenName: 'Screen Name',
  userName: 'User Name',
  role: 'Role',
};

const initialState = {
  filters: {
    region: [],
    category: [],
    screenName: [],
    userName: [],
    role: [],
  },
  utilityData: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'set_filter_data':
      return {
        ...state,
        filters: action.data,
      };
    case 'set_utility_data':
      return {
        ...state,
        utilityData: action.data,
      };
    case 'update_filter_data':
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.data,
        },
      };
    default:
      console.log(action.type);
      throw new Error('action type not permitted');
  }
};

const reduceFilterData = (data, initialData = { ...initialState.filters }) => {
  return data.reduce((init, curr) => {
    for (const key of Object.keys(curr)) {
      if (init[key] && !init[key].includes(curr[key])) {
        init[key] = [...init[key], curr[key]];
      }
    }
    return init;
  }, initialData);
};

const DashboardPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchFilterData = useCallback(async () => {
    const res = await fetch(`http://localhost:8080/api/utility/filters`);
    if (!res.ok) {
      return null;
    }
    let data = await res.json();
    data = reduceFilterData(data);
    dispatch({ type: 'set_filter_data', data });
  }, []);

  const searchWithFilters = useCallback(async () => {
    const param = searchParams.get('f');
    const res = await fetch(
      `http://localhost:8080/api/utility/search?f=${encodeURIComponent(param)}`,
    );
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    if (param) {
      const filterParams = param.split('::');
      const lastFilter = filterParams[filterParams.length - 1];
      const remainingKeys = Object.keys(initialState.filters)
        .filter((f) => !lastFilter.includes(f))
        .reduce((init, curr) => (init = { ...init, [curr]: [] }), {});
      dispatch({
        type: 'update_filter_data',
        data: reduceFilterData(data, remainingKeys),
      });
    } else {
      dispatch({ type: 'update_filter_data', data: reduceFilterData(data) });
    }
    dispatch({ type: 'set_utility_data', data });
  }, [searchParams]);

  useEffect(() => {
    fetchFilterData();
  }, []);

  useEffect(() => {
    searchWithFilters();
  }, [searchParams]);

  const handleCheckboxChange = (filterKey, e) => {
    setSearchParams((prevParams) => {
      let f = prevParams.get('f');
      if (!f) {
        prevParams.set('f', `${filterKey}:${e.target.id}`);
        return prevParams;
      }
      let filterParams = f.split('::');
      let currentIndex;
      const selectedFilter = filterParams.filter((key, i) => {
        if (key.includes(filterKey)) {
          currentIndex = i;
          return true;
        }
        return false;
      });
      if (f.includes(filterKey) && f.includes(e.target.id)) {
        const modifiedParam = selectedFilter[0]
          .split(':')
          .filter((options) => options !== e.target.id)
          .join(':');
        if (!modifiedParam.includes(':')) {
          filterParams = filterParams.filter((p) => !p.includes(modifiedParam));
        } else {
          filterParams[currentIndex] = modifiedParam;
        }
        prevParams.set('f', filterParams.join('::'));
        return prevParams;
      }
      if (f.includes(filterKey)) {
        const newParam = selectedFilter.concat(`:${e.target.id}`).join('');
        filterParams[currentIndex] = newParam;
        prevParams.set('f', filterParams.join('::'));
        return prevParams;
      }
      const newParams = f.concat(`::${filterKey}:${e.target.id}`);
      prevParams.set('f', newParams);
      return prevParams;
    });
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
                <ul role="list">
                  {state.filters[k].map((d) => {
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
                          defaultChecked={
                            searchParams.has('f') &&
                            searchParams.get('f').includes(d)
                          }
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
      <section>Main Content</section>
    </div>
  );
};

export default DashboardPage;
