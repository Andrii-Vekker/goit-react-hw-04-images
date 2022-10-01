import axios from "axios";

const KEY = "29175258-0e972b66084e1db5719a62740"

   export const fetchImg = async (page, search) => {
    const response = await axios.get(`https://pixabay.com/api/?q=${search}&page=${page}
    &key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`);
    return response.data;
};