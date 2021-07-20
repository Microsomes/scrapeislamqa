const puppeteer = require('puppeteer');
const fs= require("fs");


async function scrapePage(page,number){
    return new Promise(async (resolve,reject)=>{
        try{
        await page.goto(`https://islamqa.info/en/answers/${number}`,{waitUntil:"networkidle0"});
        var dataFromPage= await page.evaluate(()=>{
            var toReturn=[];
            var allSections=document.querySelectorAll("section");
            allSections.forEach(section=>{
                toReturn.push(section.innerText);
            })
            return toReturn;
        })

        resolve(dataFromPage);
    }catch(err){
        reject(err);
    }
    })
}

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();


  
   
        for(var i=1;i<10;i++){
            var data= await scrapePage(page,i);
            fs.writeFileSync(`./data/question_${i}`,JSON.stringify(data,null,2),(err)=>{
                console.log("bug in:"+i);
            })
            console.log(`question scrapped:${i}-${data[0]}`)
        }
    


    
    

  
    await browser.close();
  })();