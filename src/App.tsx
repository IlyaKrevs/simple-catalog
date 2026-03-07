import React, { useCallback, useEffect, useState } from 'react';

import styles from './App.module.css';
import { IResponse, IUserProps } from './types/userEntity';
import { CustomInput } from './components/CustomInput';
import { CustomGrid } from './components/CustomGrid';
import { CustomPaginatiom } from './components/CustomPagination';

// extend this obj for show more keys
const sampleUser: IUserProps = {
  id: 1,
  firstName: '',
  lastName: '',
  age: 0,
  email: '',
  role: '',
  image: '',
  gender: '',
} as const;
type UserWantedKeys = keyof typeof sampleUser;

const mainEndpoint = 'https://dummyjson.com/users';
const selectedKeys = Object.keys(sampleUser) as UserWantedKeys[];
const DEFAULT_USERS_PER_PAGE = 10;

function App() {
  const [data, setData] = useState<IResponse | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const defaultSearchParams = new URLSearchParams({
      limit: DEFAULT_USERS_PER_PAGE + '',
      skip: ((page - 1) * DEFAULT_USERS_PER_PAGE) + '',
      select: selectedKeys.join(',')
    });
    const additionalEndpoint = searchQuery
      ? `/search?q=${encodeURIComponent(searchQuery)}`
      : `?`;

    const controller = new AbortController();
    const fetchData = () => {
      setLoading(true);
      setErr(null);
      fetch(mainEndpoint + additionalEndpoint + '&' + defaultSearchParams, { signal: controller.signal })
        .then(res => res.json())
        .then((data: IResponse | null) => {
          setData(data);
        })
        .catch(e => {
          if (e.name !== 'AbortError') {
            setErr(e.message);
          } else {
            console.log('Component has been unmounted');
          }
        })
        .finally(() => setLoading(false));
    }
    fetchData();
    return () => {
      controller.abort();
    }
  }, [page, searchQuery]);

  const handlerSetSearchQuery = useCallback((v: string) => {
    setSearchQuery(v);
    setPage(1);
  }, []);

  if (err) {
    return (
      <div>Something went wrong: {err}</div>
    )
  }
  if (!data) {
    return null;
  }

  return (
    <div className={styles.App}>

      <CustomInput
        input={input}
        handleInput={setInput}
        handleDebounceInput={handlerSetSearchQuery}
      />

      <CustomGrid
        titles={selectedKeys}
        data={data.users as unknown as Record<string, string | number>[]}
        loading={loading}
        imageKeys={['image']}
      />

      <CustomPaginatiom
        current={page}
        total={data.total}
        perPage={DEFAULT_USERS_PER_PAGE}
        pickPage={setPage}
      />
    </div>
  );
}

export default App;
