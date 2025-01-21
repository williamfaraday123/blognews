const SearchOptionsList = ({ searchOptions, onSelectSearchOption }) => {
    return(
        <div>
            {searchOptions?.map((searchOption, index) => (
                <div
                    key = {index}
                    onClick = {() => onSelectSearchOption(searchOption)}
                >
                    {searchOption?.properties?.country}, {searchOption?.properties?.name}
                </div>
            ))}
        </div>
    );
};

export default SearchOptionsList;