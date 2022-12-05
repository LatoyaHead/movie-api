import {useState} from 'react';

const Form = ( props) => {
    const {movieSearch, getSearch} = props;

    // State to hold the form data
    const [formData, setFormData] = useState({searchTerm: '', name: ''})

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    
    const handleSubmit = (e) => {
      e.preventDefault() //stop the form from refreshing the page
      movieSearch(formData.searchTerm)
      getSearch(formData.searchTerm)
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='search-parent'>
        <input type="text" value={formData.searchTerm} onChange={handleChange} 
        name="searchTerm" required/>
        <input type="submit" value="search" className='search-btn'/>
        </div>
      </form>
    </div>
  );
};

export default Form;