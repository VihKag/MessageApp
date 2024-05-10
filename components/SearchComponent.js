import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SearchBar,Icon } from '@rneui/themed';

const SearchComponent = ({
  chatClient,
  currentUser,
  fetchData, // Hàm tìm kiếm dữ liệu
  renderItem, // Hàm render item trong FlatList
  useEffectDependencies = [], // Các dependencies cho useEffect
  setIsSearching,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if(fetchData){
        fetchData(searchTerm, setSearchResults);
        setIsSearching(searchTerm.length > 0);
    }
  }, [searchTerm, chatClient, ...useEffectDependencies]);

  const handleSearchBarFocus = () => {
    setIsSearchBarFocused(true);
  };

  const handleSearchBarBlur = () => {
    setIsSearchBarFocused(false);
  };

  const updateSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <>
      <SearchBar
        placeholderTextColor="#fff"
        placeholder="Tìm kiếm"
        value={searchTerm}
        onChangeText={updateSearch}
        platform="android"
        searchIcon={
          <Icon
            name="search"
            size={24}
            color="#fff"
          />
        }
        leftIconContainerStyle={styles.iconContainer}
        rightIconContainerStyle={styles.iconContainer}
        inputContainerStyle={
          isSearchBarFocused
            ? styles.inputContainerFocused
            : styles.inputContainerDefault
        }
        containerStyle={styles.containerSearch}
        onFocus={handleSearchBarFocus}
        onBlur={handleSearchBarBlur}
      />
      {searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  containerSearch: {
    backgroundColor: '#41ADFA',
    padding: 8,
  },
  inputContainerDefault: {
    borderRadius: 12,
    backgroundColor: '#41ADFA',
  },
  inputContainerFocused: {
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  iconContainer: {
    tintColor: '#fff',
  },
});

export default SearchComponent;