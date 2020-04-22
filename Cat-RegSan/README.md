## Non programadores
Todos los datos en tablas estan en formato .csv
Se pueden abrir facilmente en Excel.

# Cat_RegSan

**Visit our blog:**
[catcovidtransparencia.blogspot.com](https://catcovidtransparencia.blogspot.com/)

We reconstructed precisely all the data for each Regions Sanitarias (**RegSan**) de Cataluña, as they are used by the Gencat in their 'comunicats'. They use 3 specific regions, respect to the standart regions:
- **Igualada** . datas in Igualada given by Gencat.
- **Lleida-Pir** . Lleida and Pirineu under 1 region.
- **Central-sin-Igua** . datas in Cataluña Central without the Igualada area.

For our study of the impact of the Manifestation of the 29-F on the coronavirus epidemic in Cataluña, it was important to reconstruct the deaths and UCI data by sanitary region, and isolate the datas from Igualada that is a ecosystem by itself.

- **deaths** : complete. for all RegSan, apart a few holes in the datas that we filled (medium), when its only 1 continuous hole in a regular serie.
- **cases** : nearly complete. missing Central region data. we work on it.
- **ICU** :  nearly complete. Only missing for Igualada from 2020-03-23
- **recovered**: incomplete

Our main consolidated files for our study are:

- **Cat_RegSan_deaths_series.csv**
- **Cat_RegSan_ICU_series.csv**

Yes, we got ALL the deaths datas from all Regions Sanitarias de Cataluña!

## How we did it

Look at the folder **/Units**.

## Other files

### Map of the RegSan

`Cat-RegSan_Map_geo.json`

We had to do a special map, that reflected the way Gencat was grouping the numbers.

We separeted **Igualada** (the conca d'Odena) from the rest of Cataluña Central.
We joined Lleida and Pirineu as **Lleida-Pir**.

### Infos of the RegSan

`Cat-RegSan_infos.json`

Information for each RegSan of:
- Code Catsalut
- latlong
- Population
- Pop over 65
- km2

We had to recalculate the population, that reflected the way Gencat was grouping the numbers.

The RegSan **Igualada** (the conca d'Odena) has 70000 inhabitants.

The RegSan **Central-sin-Igua** has 441707 inhabitants, instead of 511707 for **Central**.

The RegSan **Perpignan** as 474452 inhabitants and is the department of Pyrénées-Orientales.