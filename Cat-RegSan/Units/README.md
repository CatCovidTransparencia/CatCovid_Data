## Non programadores
Todos los datos en tablas estan en formato .csv
Se pueden abrir facilmente en Excel.

# Cat_RegSan/Units

We reconstructed precisely all the data for each Regions Sanitarias (**RegSan**) de Cataluña, as they are used by the Gencat in their 'comunicats'. They use 3 specific regions, respect to the standart regions:
- **Igualada** . datas in Igualada given by Gencat.
- **Lleida-Pir** . Lleida and Pirineu under 1 region.
- **Central-sin-Igua** . datas in Cataluña Central without the Igualada area.

For our study of the impact of the Manifestation of the 29-F on the coronavirus epidemic in Cataluña, it was important to reconstruct the deaths and UCI data by sanitary region, and isolate the datas from Igualada that is a ecosystem by itself.

- **deaths** : complete. for all RegSan. Apart a few holes in the datas that we filled (medium), when its only 1 continuous hole in a regular serie.
- **cases** : nearly complete. missing Central region data. we work on it.
- **ICU** :  nearly complete. Only missing for Igualada from 2020-03-23
- **recovered**: incomplete

Our main consolidated files for our study are:

- **Cat_RegSan_deaths_series.csv**
- **Cat_RegSan_ICU_series.csv**

Yes, we got ALL the deaths datas from all Regions Sanitarias de Cataluña!

## How we did it

### From source : **Comunicat del Departament de Salut**
(links in each file)
- Cataluña_series.csv
- Igualada_series.csv

That gives us, **Cat-sin-Igua** (Cataluña minus Igualada).  
`node Cat_RegSan_Cat-sin-Igua_Calc.js`  
- Cat-sin-Igua_series.csv

### From sources : **Press articles**
(links in each file)
- Central-sin-Igua_series.csv
- Girona_series.csv
- Lleida-Pir_series.csv
- Tarragona_series.csv
- Ebre_series.csv

We then, substract all of them from
- Cat-sin-Igua_series.csv  
`node Cat_RegSan_Barcelona_Calc.js`
- Barcelona_series.csv

and also calculated
- Central_series.csv  
adding Central-sin-Igua_series.csv and Igualada_series.csv


files:

- Barcelona_series.csv
- Cat-sin-Igua_series.csv
- Cataluña_series.csv
- Central-sin-Igua_series.csv
- Central_series.csv
- Ebre_series.csv
- Girona_series.csv
- Igualada_series.csv
- Lleida-Pir_series.csv
- Tarragona_series.csv