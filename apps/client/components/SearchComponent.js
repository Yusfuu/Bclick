import React, { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import tw from "twrnc";

export const SearchComponent = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const onChangeSearch = query => setSearchQuery(query);

    return (
        <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
        />
    );
};




