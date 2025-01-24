import regionsDetails from './regionsDetails.json';
import styles from './regionsSearch.module.css';

const RegionsSearch = ({ onSelect }) => {
    return (
        <div className={styles.regionsSearchContainer}>
            <div className={styles.regionsSearchLabel}>Continents and Oceans</div>
            <select
                onChange={onSelect}
                className={styles.regionsSearchList}
            >
                {regionsDetails?.map((regionsDetail, index) => (
                    <option
                        key = {index}
                        value = {regionsDetail?.region}
                        className={styles.regionsSearchItem}
                    >{regionsDetail?.region}</option>
                ))}
            </select>
        </div>
    );
};

export default RegionsSearch;