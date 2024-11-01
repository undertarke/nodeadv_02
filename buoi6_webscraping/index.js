// console.log("hello world")
// echo "hello world"
// print("hello world")
// Console.Write("hello world")
// System.out.print("hello world")
// cout << "hello world"
// prinf('hello world')

// import fs from 'fs' // ES module 

let lstCategory = [1882, 8322, 1833, 1789, 2549, 1815, 1520, 8594, 931, 4384, 1975, 915, 17166, 1846, 1686, 4221, 1703, 1801, 27498,
    44792, 8371, 6000, 11312, 976, 27616]
// commonjs module
const fs = require('fs') // file system
const UserAgent = require('user-agents')

// fetch(`https://tiki.vn/api/personalish/v1/blocks/listings?limit=40&sort=top_seller&page=1&urlKey=laptop-may-vi-tinh-linh-kien&category=1882`).then(response => {
//     return response.json()
// }).then(response => {
//     console.log(response.data)
// })
const lstProduct = []
const fectData = async () => {
    try {

        for (const cateId in lstCategory) {
            
            let userAgent = new UserAgent({ deviceCategory: 'desktop' })

            let fetchPromies = []
            for (let page = 1; page <= 50; page++) {
                
                fetchPromies.push(
                    fetch(`https://tiki.vn/api/personalish/v1/blocks/listings?limit=40&include=advertisement&aggregations=2&version=home-persionalized&trackity_id=b13c5804-dded-78d0-0b44-01296826bb3c&category=${cateId}&page=${page}&urlKey=thiet-bi-kts-phu-kien-so`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'User-Agent': userAgent.toString()
                        }
                    })
                )

            }
            const responses = await Promise.all(fetchPromies)
            for (const res of responses) {

                if (!res.ok) {
                    console.log("error data")
                    continue;
                }

                const resData = await res.json()

                if (resData.data && resData.data.length > 0) {
                    resData.data.forEach(item => {
                        console.log(item.id)
                        lstProduct.push({
                            name: item.name,
                            image: item.thumbnail_url
                        })
                    })
                }
            }
        }
    } catch (ex) {
        console.log(ex)
    }

    return lstProduct
}

fectData().then(result => {
    fs.writeFileSync(process.cwd() + "/data.json", JSON.stringify(result))
})