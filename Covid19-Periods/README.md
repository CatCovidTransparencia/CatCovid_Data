# Covid19_Periods

The final file is:  
**covid19_periods.json**


It contains all the periods we calculated for Covid-19 in days increment.

All periods contains 3 attributes:

- **offset** : The offset from day 0. If you want to have the serie starting at 0 day, you will have to add in front multiple (offset number) 0 before the values.
- **length** : The length of the values.
- **values** : The values, starting at the first significant one. Use the Offset attributes to offset this serie in your simulation. For example, if offset is 8, this serie will start at day 8 after the event (example: infection at day 0)

**/Units**

The individual periods. No need to use them, normally.

**Scientific Sources: /Studies**

We compared a lot of scientific studies and articles on the Covid-19.
The main one we used and took values from are referenced in our article:

[Blog_Periodos del Covid-19](https://catcovidtransparencia.blogspot.com/2020/04/periodos-del-covid-19.html)

The value we used represents a compromise between different studies, and is generally widely accepted by the researchers.  
Keep in mind that knowing the Covid-19 is a work in progress.