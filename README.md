## Drug Search React App! ##

This simple application allows users to enter a drug name into the search box and select a drug from the returned list. Clicking on a result takes the user to the drug information page, which displays information such as drug name, synonym and rexcui id. The NDCs for the drug is also displayed.

The RxNorm API's (getDrugs, getSpellingSuggestions and getNDCs) were used to grab the appropriate drug information. 

TODO: The suggestions list is being returned, but I am unable to display it for the results if the user entered a partial name. Somewhere along the re-render cycle the list is being cleared. Another possiblity is that the check for 'resultData' needs to be more fine-tuned. 

## Screenshots: ##

![SearchHomePageScreenshot](https://user-images.githubusercontent.com/19416227/135561119-856454b4-5a51-4165-8d17-d5a89b6d0ef5.png)

![DrugInformationScreenshot](https://user-images.githubusercontent.com/19416227/135561136-f6d13935-8dd0-4b4e-8bd6-bd2687a2d254.png)
