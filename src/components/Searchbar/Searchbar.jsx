import { Formik } from 'formik';
import * as yup from 'yup';
import { Header, SearchForm, SearchFormBtn, SearchFormBtnLabel, SearchInput } from './SearchBar.styled';
import PropTypes from 'prop-types';

const schema = yup.object().shape({
    name: yup.string().required("Please enter name of picture"),
  
    
});

const initialValues = {
        name: '',
};
export default function SearchBar ({onSearch}) {
    const handleSubmit = (values) => {
        onSearch(values);
    };
    
    return (
     
        <Header>
            
            <Formik validationSchema={schema} onSubmit={handleSubmit} initialValues={initialValues}>
                <SearchForm>
                    <SearchFormBtn type="submit">
                        <SearchFormBtnLabel>Search</SearchFormBtnLabel>
                    </SearchFormBtn>

                    <SearchInput
                        name="name"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </SearchForm>
            </Formik>
        </Header>
    );
};

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired
}