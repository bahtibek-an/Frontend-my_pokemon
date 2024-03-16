import React from 'react'
import styles from  "./SearchBar.module.css"
import { Form, Input } from 'antd'
const SearchBar = ({onSearch}:any) => {
  return (
    <div className={styles.searchbar}>
      <Form onChange={onSearch}>
      <Input  placeholder='Search...'/>
      </Form>
    </div>
  )
}

export default SearchBar