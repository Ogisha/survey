<template>
  <div id="app">
    <div class="mod">
      <div class="desno">
        <form id="form1">
          
          <p>FIRST NAME<br />
            <input
                   type="text"
                   name="firstname"
                   placeholder="Unesite ime..."
                   @keyup.enter="provjeriTekstInput(firstName)"
                   v-model="firstName">
          </p>
          
          <p>LAST NAME<br />
            <input type="text" name="lastName" placeholder="Unesite prezime...">
          </p>
          
          <p>TITLE<br />
            <input type="text" name="title" placeholder="Unesite profesiju...">
          </p>
          
          <p>EMAIL<br />
            <input
                   type="email"
                   id="emailInput"
                   name="email"
                   @keyup.enter="provjeriEmail"
                   placeholder="Unesite email..."
                   v-model="email"
                   v-bind:class="rejectedClass">
            <span v-bind:class="{hidden: rejectedClass!='emailInput'}">Unesite Ispravan email, format 'nesto@nesto.com'</span>
          </p>
          
          <p>Pick Your skills level<br />
          <button type="button" class="jao" id="skillBtn1" name="1" @click="nadji"></button>
          <button type="button" class="jao" id="skillBtn2" name="2" @click="nadji"></button>
          <button type="button" class="jao" id="skillBtn3" name="3" @click="nadji"></button>
          <br />
          <span id="skillLevel">{{ nivo }}</span></p>

          <button id="pokazi">NEXT</button>
        </form>
      </div>
    </div>
    
    <div id="part2">
      <form id="popis" enctype="text/plain">
        <div id="forma2"></div>
        <button type="submit" id="gotovoBtn">Zavrsi</button>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  data: function() {
    return {
      skill: "Junior",
      firstName: "",
      email: "",
      nivo: "Junior",
      rejectedClass: "",
      answers: [ {
        questionid: 0,
        answer: ""
      }]
    };
  },
  
  methods: {
    provjeriTekstInput: function(temp) {
            alert("hello!");
      if ((/[\W]/.test(temp)) || (/[\d]/.test(temp))) 
        alert("true");
      else
        alert("false");
      
      return false;
    },
    
    provjeriEmail: function() {
  
      if ((/[@]/.test(this.email)) && (/[.]/.test(this.email))) {
        this.testVar = true;
        this.rejectedClass = "";
      }
      
      else {
        this.testVar = false;
        this.email = "";
        this.rejectedClass = "emailInput";
      } 
    },
    
    nadji() {
      
      var temp2 = document.getElementsByClassName("jao").length;
      var temp = event.target.name;
      
      if (temp === "1" )
        this.nivo = "Junior";
      if (temp === "2")
        this.nivo = "Medior";
      if (temp === "3")
        this.nivo = "Senior";

      for (var i = 0; i < temp; i++) {
        document.getElementsByClassName("jao")[i].style.backgroundColor = "green";
      }
      for (var i = temp; i < temp2; i++) {
        document.getElementsByClassName("jao")[i].style.backgroundColor = "";
      }
    },
  }
};

</script>

<style lang="scss">
  .emailInput {
    border: 3px solid red;
    box-shadow: 1px 1px 1px orange;
  }
  
  .hidden {
    display: none;
  }
  
  .green {
    background: green;
  }
  
  fieldset {
    border-left: none;
    border-right: none;
    border-bottom: none;
    padding: 0;
  }
</style>
