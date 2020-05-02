# EU-Reg

The final file is:  
`EU-Reg_deaths-hosp_series.csv`

It contains the **deaths-series (in hospital)** for the European countries and regions we used in our comparative. All the values come from official sources.  
We get the regional datas for:  
Spain, France, Italy, Belgium, Germany, UK.  
We mainly use, Madrid (ES-MD), Lombardia (IT-LOM).

A visualization of Europe regions , in deaths per million:  
https://datawrapper.dwcdn.net/zhV5A/4/


**The spanish regional datas are one day earlier than the official Gobierno dates. It's because they give the numbers at midday, the day after the 21h recount closing.**  
**It' important for us to adjust to the real date, given that we are analising precise time events.**


There's a file with the Total deaths number given by country, the number you see in the news. The numbers are the same for Spain, Italy and Germany, because they don't give total deaths numbers.  
Each country use a diferent methodology. They don't give regional recount of total deaths:  
`EU_deaths-All_series.csv`

## EU-Reg_infos

You can use these files to convert from ISO code to name.  
For each Country or region, you can find informations of population and km2.  

Ordered by Name :  
`EU-Reg_infos.json`  

Ordered by [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) and [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2:ES).  
Cataluña is (ES-CT) :   
`EU-Reg_infos_ISO.json`

## /Maps

Different maps of Europe and regions.

The most defined geoJSON map is:  
`EU_Reg-SIFDBGE_map.json`
regions of Spain,Italy,France,Deutchland,Belgium,GB,England.

## /scripts

Many scripts to reorder the original sources in an unified format.  

Other scripts to mainly align the data from all regions around a value.  
-  _min_Calc : align the regions with first value at minimum 6.