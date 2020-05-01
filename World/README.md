# World
 
There's 3 infos files that you can use for getting infos for each country.  
**ISO, name, population, km2, lat, long**.  
You can load them directly in a js object. They are ordered by ISO code or by name.  
- **World_infos_ISO.json**
- **World_infos.json**

The main database for our world reference is the **Johns Hopkins University** repository, used in most coronavirus studies.
[ CSSEGISandData /
COVID-19 ](https://github.com/CSSEGISandData/COVID-19)

We had to correct a few typos and datas , and names for 264 Countries/Regions.  
You can find the cleaning process in the folder **/World_Series**

We then slimed the database to the **50 most significant Countries**, which went over 90 deads during the epidemic.  
 `World_slim_Calc.js`

This is our base file for our study:
- **World_deaths_series.csv**

## Other folders for comparative analysis
**The folders min6, min10, min(num)** contains files, with countries all aligned with first value over 6 or 10, and 2 files calculating the grow and grow_%.  
node script:  
`World_min_Calc.js`  
`World_grow_Calc.js`

**The folders min40_off7, min(num)_off(num)** contains files, with countries all aligned with first value over 40, and writing the 7 previous value before it. So values (over 40) are aligned (offset) at day 7.  
node script:  
`World_min_off_Calc.js`