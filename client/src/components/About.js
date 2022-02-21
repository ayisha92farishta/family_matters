import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-container">
      <div class="background-image"></div>
      <div className="all-content">
        <p id="intro">
          <b>Family first</b> seems to be the motto for many. Keeping your tasks
          and ideas organized amidst all your busy schedules can be quite
          challenging. But it is equally important to give time for your family
          and see that everything is in place, because…{" "}
          <span id="app_title">
            <br></br>
            <b>
              <i>family matters</i>
            </b>
            .<br></br>
          </span>{" "}
          We care and love our family. Keep your family at the heart of what you
          do and what you plan...Here is small effort to help you keep your
          plans organized.
        </p>
        <div class="features">
          <p>
            <i>
              <b>Family matters</b>
            </i>{" "}
            allows a primary user to register and add other family members to
            the same account. Every member of the family can see and access
            content created by other members of the family, unless marked
            private.
          </p>
          <p>
            <b>Calendar</b>: Got to pick up the dry cleaning on the way back
            from dental appointment before the game tonight? Set reminders,
            appointments or events in the calendar and never miss a thing!
          </p>
          <p>
            <b>Lists</b>: Start with readily available <i>Groceries</i> and{" "}
            <i>Chores</i> list. Planning a surprise party? You can make lists
            private too!
          </p>
          <p>
            <b>Meal Planner</b>: Plan ahead! Track your healthy meal plan here.
          </p>
          <p>
            <b>Recipes</b>: Found Grandma’s secret recipes? Add them here and
            pass them along for generations to come!
          </p>
          <p>
            <b>Contacts</b>: Store contact details of your extended families to
            ensure your family stays connected.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
