import axios from "axios";

const booksService = {
    BASIC_URL: "http://localhost:3000/books",
    API_KEY: "FGGF2342",

    async getAll(){
        try {
            const response = await axios.get(this.BASIC_URL);

            return response.data;
          }
          catch(error){
            console.log(error)
            return error;
          }
    },

    async getById(id){
        try {
            const response = await axios.get(`${this.BASIC_URL}/${id}`);

            return response.data;
          }
          catch(error){
            console.log(error)
            return error;
          }
    },

    async post(book){
        try{
            const response = await axios.post(this.BASIC_URL, book);
            return response.data;
        }
        catch(error){
            console.log(error)
            return error;
        }
    },

    async delete(id){
        try{
            const response = await axios.delete(`${this.BASIC_URL}/${id}`);
            return response.data;
        }
        catch(error){
            console.log(error)
            return error;
        }
    }
}

export default booksService;