import { JSDOM } from 'jsdom';
import axios from 'axios'
import UserAgent from 'user-agents'

let userAgent = new UserAgent({ deviceCategory: 'desktop' })

axios.get(`https://www.amazon.com/gp/product/ajax/ref=dp_aod_pn?asin=B0D2PQ9RWC&m=&qid=1730468197&smid=&sourcecustomerorglistid=&sourcecustomerorglistitemid=&sr=8-1&pc=dp&experienceId=aodAjaxMain`, {
    headers: {
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        Host: 'www.amazon.com',
        'User-Agent': userAgent.toString()
    }
}).then(result => {


    const dom = new JSDOM(result.data)

    let name = dom.window.document.querySelector("#aod-asin-title-text").innerHTML
    //pinned-image-id
    let image = dom.window.document.querySelector("#pinned-image-id img").getAttribute("src")

    console.log(name)
    console.log(image)
})
