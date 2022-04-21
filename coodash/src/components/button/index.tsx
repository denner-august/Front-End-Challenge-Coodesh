import styles from "./styles.module.scss";
import { useContext, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import Context from "../../Context/users";
export function Button() {
  const [pageIndex, setPageIndex] = useState(2);

  const { dataGlobal, setDataGlobal } = useContext(Context);
  const { data, error } = useFetch(
    `https://randomuser.me/api/?page=${pageIndex}&results=50&seed=1`
  );

  function newPages() {
    setPageIndex(pageIndex + 1);
    if (data) {
      let FetchData = data.results.map((item: any) => item);
      let GlobalData = dataGlobal.results.map((item: any) => item);
      let FetchGlobalData = GlobalData.concat(FetchData);
      const final = { results: [...FetchGlobalData], info: data.info };
      setDataGlobal(final);
    }
  }

  return (
    <>
      <button
        type="button"
        className={styles.button}
        onClick={() => newPages()}
      >
        Carregar mais pacientes
      </button>
    </>
  );
}
