class UIManager {  //could be either a class or object literal

    constructor() {
        this.radio1 = createRadio("Choosing County");
        this.radio1.option("Fulton, GA");
        this.radio1.option("Monroe, NY");
        this.radio1.changed(radio1Clicked);

        createP();
        createP();

        this.radio2 = createRadio("Diff Tracts 1");
        this.radio2.option("Map median asthma, high blood pressure, & whiteness");
        this.radio2.option("Map GINI coefficient, no health insurance, & median income");
        this.radio2.changed(radio1Clicked);
        
        createP();
        createP();

        this.radio3 = createRadio("Diff Tracts 2"); 
        this.radio3.option("For all tracts");
        createP();
        this.radio3.option("For GINI coefficient < .33");
        createP();
        this.radio3.option("For >30% non-white tracts");
        this.radio3.changed(radio1Clicked);

        createP();
        createP();
        createP();
        createP();

        this.radio4 = createRadio("Details");
        this.radio4.option("Details");
        this.radio4.option("No details");
        this.radio4.changed(radio1Clicked);
    }
}
