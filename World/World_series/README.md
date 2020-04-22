# World_series

The main database for our world reference is the **Johns Hopkins University** repository, used in most coronavirus studies.
[ CSSEGISandData /
COVID-19 ](https://github.com/CSSEGISandData/COVID-19)

After a few typos and datas corrections, and joining under one name Province/country and using an european date system , we obtained our cleaned reference files for 264 Countries/Regions:
- Countries-All_deaths_series.csv
- Countries-All_LatLong.csv

## Corrections

### Typos corrected
The comma in "Korea,South" was giving an error, we replaced it with "Korea South".  
The comma in "Bonaire, Sint Eustatius and Saba" was giving an error, we replaced it with "Bonaire Sint Eustatius and Saba".


### Datas corrected
Some data sequences where incomplete or redundant on some days, creating stairs. We replaced them with more acurate data from Worldometers web site.

UK : [worldometers_uk](https://www.worldometers.info/coronavirus/country/uk/)
- original from 2020-03-04:  
0	1	2	2	3	4	6	8	8	8	21	21	55	55	71	137	177
- replaced with:  
0	1	2	2	3	5	6	8	10	11	21	35	55	71	104	144	177

Spain : [worldometers_spain](https://www.worldometers.info/coronavirus/country/spain/)
- original from 2020-03-11:  
54 55 133
- replaced with:  
54 86 133

France : [worldometers_france](https://www.worldometers.info/coronavirus/country/france/)
- original from 2020-03-01:  
2	3	4	4	6	9	11	19	19	33	48	48	79	91	91	148	148	148	243	450	562	674	860	1100
- replaced with:  
2	3	4	4	6	9	11	19	30	33	48	61	79	91	127	148	175	244	372	450	562	674	860	1100

Turkey : [worldometers_turkey](https://www.worldometers.info/coronavirus/country/turkey/)
- original from 2020-03-17:  
1	1	3	4	9	30
- replaced with:  
1	2	4	9	21	30

Philipines :  [worldometers_philippines](https://www.worldometers.info/coronavirus/country/philippines/)
- original from 2020-03-12:  
1	1	2	5	8	11	12	12	19	19	19	19	25
- replaced with:  
1	2	5	5	8	12	12	14	17	17	18	19	25

Indonesia :  [worldometers_indonesia](https://www.worldometers.info/coronavirus/country/indonesia/)
- original from 2020-03-17:  
5
- replaced with:  
7

Switzerland :  [worldometers_switzerland](https://www.worldometers.info/coronavirus/country/switzerland/)
- original from 2020-03-11:  
4	4	11	13	14	14	27	28	41	54	75	98
- replaced with:  
4	7	11	13	14	19	27	33	43	56	80	98

Serbia : 

Quebec : 

Italy :