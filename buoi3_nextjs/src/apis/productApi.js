import axios from "axios"

export const getProduct = async (params) => {
    let { data } = await axios.get(`https://apistore.cybersoft.edu.vn/api/Product?keyword=${params}`)

    return data
}

export const getDetail = async (id) => {
    let { data } = await axios.get(`https://apistore.cybersoft.edu.vn/api/Product/getbyid?id=${id}`)
    console.log(data)
    return data

}

