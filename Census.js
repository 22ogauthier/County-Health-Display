/**
 * Olivia Gauthier
 * IGME-102: Project 2 Health Visualization, 11/15/23
 * Create the census objects
*/
class Census {

    constructor(tractObj) {
        //JSON: JS Object Notation Slide 15 
        for (let obj in tractObj) {
            this[obj] = tractObj[obj];
        }

        let lonRange;
        let latRange;
        /*
        ["lon"]	Locality longitude(more negative = more West)
				Monroe Co, NY range: -77.96 to - 77.41
				Fulton Co, GA range: -84.54 to - 84.19
        ["lat"]	Locality latitude(more positive = more North)
			    Monroe Co, NY range: 43.33 to 42.96
				Fulton Co, GA range: 34.08 to 33.60
        */
        if (this.state == "NY") {
            lonRange = { min: -77.96, max: -77.41 };
            latRange = { min: 43.33, max: 42.96 };
        } else {
            lonRange = {min: -84.54, max: -84.19};
            latRange = {min: 34.08, max: 33.60};
        }

        //scale remapping
        this.x = map(this.lon, lonRange.min, lonRange.max, 0, width);
        this.y = map(this.lat, latRange.min, latRange.max, height, 0);
    }

    //display method for high blood pressure radio button
    display() { 
        /*
        Population: size of outer oval
        Whiteness: size of inner oval 
        adult asthma: height of line
        adult high blood pressure: color of outer oval
        */

        //blood pressure
        if (this.outcomes["High Blood Pressure"] > 60 && this.outcomes["High Blood Pressure"] < 100) {
            fill(252, 0, 0);
        } else if (this.outcomes["High Blood Pressure"] > 40 && this.outcomes["High Blood Pressure"] < 60) {
            fill(255, 128, 0);
        } else if (this.outcomes["High Blood Pressure"] > 30 && this.outcomes["High Blood Pressure"] < 40) {
            fill(255, 255, 0);
        } else if (this.outcomes["High Blood Pressure"] > 15 && this.outcomes["High Blood Pressure"] < 30) {
            fill(128, 255, 0);
        } else {
            fill(0, 255, 0);
        }

        //population
        ellipse(this.x, this.y, this.population / 200);

        //whiteness
        fill("light blue");
        ellipse(this.x, this.y, this.white / 200, this.population / 200);

        //height of line
        fill("pink");
        rect(this.x, this.y - (this.population / 200) / 2, this.outcomes["Current Asthma"] / 200 * 100)
    }

    //display method for median income radio button
    display2() {
        /*
        Population: size of outer oval
        adults uninsured: size of inner oval 
        GINI inequality: height of line
        median income: color of outer oval
        */

        //median income
        if (this.medianIncome > 200000) {
            //200,000<
            fill(255, 153, 204);

        } else if (this.medianIncome > 150000 && this.medianIncome < 20000) {
            //150,000-200,000
            fill(255, 153, 255);

        } else if (this.medianIncome > 125000 && this.medianIncome < 150000) {
            //125,000-150,000
            fill(204, 153, 255);

        } else if (this.medianIncome > 100000 && this.medianIncome < 125000) {
            //100,000-125,000
            fill(153, 153, 255);

        } else if (this.medianIncome > 85000 && this.medianIncome < 100000) {
            //85,000-100,000
            fill(153, 204, 255);
        }
        else if (this.medianIncome > 75000 && this.medianIncome < 85000) {
            //75,000-85,000
            fill(153, 255, 255);
        }
        else if (this.medianIncome > 65000 && this.medianIncome < 75000) {
            //65,000-75,000
            fill(153, 255, 204);
        }
        else if (this.medianIncome > 55000 && this.medianIncome < 65000) {
            //55,000-65,000
            fill(153, 255, 153);
        }
        else if (this.medianIncome > 45000 && this.medianIncome < 55000) {
            //45,000-55,000
            fill(204, 255, 153);
        }
        else if (this.medianIncome > 35000 && this.medianIncome < 45000) {
            //35,000-45,000
            fill(255, 255, 153);
        }
        else if (this.medianIncome > 25000 && this.medianIncome < 35000) {
            //25,000-35,000
            fill(255, 204, 153);
        }
        else if (this.medianIncome > 15000 && this.medianIncome < 25000) {
            //15,000-25,000
            fill(255, 153, 153);
        }
        else {
            fill(255, 0, 0);
        }

        //population
        ellipse(this.x, this.y, this.population / 200);

        //adults insured
        fill("light blue");
        rect(this.x, this.y - (this.population / 200) / 2, this.preventions["Health Insurance"], this.population / 200);

        //gini
        fill("pink");
        rect(this.x, this.y - (this.population / 200) / 2, this.gini * 10)
    }

    // text display method for high blood pressure radio button
    displayText1() {
        fill("black");
        text(this.toString2(), this.x, this.y);
    }

    //text display method for median income radio button
    displayText2() {
        fill("black");
        text(this.toString2(), this.x, this.y);
    }


    toString() {
        return "pop " + numFormat.num.format(this.population) + ": " + numFormat.pct.format(this.white / this.population) + " white,\n" + numFormat.pct.format(this.outcomes["High Blood Pressure"] / 100) + " adult HBR,\n" + numFormat.pct.format(this.outcomes["Current Asthma"] / 100) + " adult asthma";
    }

    toString2() {
        return "pop: " + numFormat.num.format(this.population) + ": " + numFormat.num.format(this.gini) + " GINI,\n" + numFormat.cur.format(this.medianIncome) + " median income,\n" + numFormat.pct.format(this.preventions["Health Insurance"] / 100) + " adults insured";
    }
}
