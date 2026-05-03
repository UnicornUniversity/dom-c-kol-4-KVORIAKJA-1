//=============== Program na generovanie zamestnancov a štatistík ===============



/**
 * Hlavná funkcia programu.
 *
 * @param {object} dtoIn vstupné dáta
 * @returns {object} výstupné štatistiky
 */
function main(dtoIn) {

  //==== generovanie zamestnancov ====
  const employeeList = generateEmployeeData(dtoIn);

  //==== vytvorenie štatistík ====
  const dtoOut = getEmployeeStatistics(employeeList);

  //==== výsledok ====
  return dtoOut;
}



/**
 * Funkcia na generovanie zamestnancov.
 *
 * @param {object} dtoIn vstupné dáta
 * @returns {Array} pole zamestnancov
 */
function generateEmployeeData(dtoIn) {

  //==== najčastejšie mužské mená v ČR ====
  const fnMale = [
    "Jan","Jiří","Josef","Petr","Pavel","Martin","Tomáš","Jaroslav","Miroslav","Zdeněk",
    "Václav","Michal","František","Karel","Lukáš","David","Ondřej","Radek","Roman","Marek",
    "Aleš","Daniel","Filip","Adam","Matěj","Dominik","Patrik","Jakub","Stanislav","Vojtěch",
    "Oldřich","Rostislav","Hynek","Libor","Bohumil","Miloš","Igor","Denis","Vilém","Eduard",
    "Leoš","Oto","Richard","Radim","Luboš","Erik","Sebastián","Tobiáš","Kryštof","Samuel"
  ];

  //==== najčastejšie ženské mená v ČR ====
  const fnFemale = [
    "Jana","Marie","Eva","Hana","Anna","Lenka","Kateřina","Alena","Petra","Lucie",
    "Jaroslava","Věra","Martina","Jitka","Veronika","Monika","Zuzana","Michaela","Markéta","Tereza",
    "Barbora","Simona","Ivana","Radka","Dagmar","Blanka","Olga","Pavla","Soňa","Renata",
    "Gabriela","Kristýna","Karolína","Eliška","Adéla","Klára","Dominika","Patricie","Amálie","Julie",
    "Nela","Emilie","Sofie","Valerie","Laura","Nikola","Denisa","Tamara","Milena","Ludmila"
  ];

  //==== najčastejšie mužské priezviská v ČR ====
  const snMale = [
    "Novák","Svoboda","Novotný","Dvořák","Černý","Kučera","Veselý","Horák","Němec","Marek",
    "Pokorný","Pospíšil","Hájek","Jelínek","Král","Růžička","Beneš","Fiala","Sedláček","Doležal",
    "Zeman","Kolář","Navrátil","Čermák","Vaněk","Urban","Blažek","Kříž","Kopecký","Mareš",
    "Štěpánek","Vacek","Moravec","Pavlík","Kovář","Krejčí","Konečný","Šimek","Dvořáček",
    "Kozák","Fousek","Vlček","Čech","Polák","Musil","Štěpán","Janda","Píša","Václavík"
  ];

  //==== najčastejšie ženské priezviská v ČR ====
  const snFemale = [
    "Nováková","Svobodová","Novotná","Dvořáková","Černá","Kučerová","Veselá","Horáková","Němcová","Marková",
    "Pokorná","Pospíšilová","Hájková","Jelínková","Králová","Růžičková","Benešová","Fialová","Sedláčková","Doležalová",
    "Zemanová","Kolářová","Navrátilová","Čermáková","Vaňková","Urbanová","Blažková","Křížová","Kopecká","Marešová",
    "Štěpánková","Vacková","Moravcová","Pavlíková","Kovářová","Krejčíová","Konečná","Šimková","Dvořáčková",
    "Kozáková","Fousková","Vlčková","Čechová","Poláková","Musilová","Štěpánová","Jandová","Píšová","Václavíková"
  ];

  //==== pohlavia a pracovné úvazky ====
  const genders = ["male", "female"];
  const workloads = [10, 20, 30, 40];

  /**
   * Vyberie náhodný prvok z poľa.
   *
   * @param {Array} arr vstupné pole
   * @returns {*} náhodný prvok
   */
  function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /**
   * Vygeneruje náhodné číslo z intervalu.
   *
   * @param {number} min minimálna hodnota
   * @param {number} max maximálna hodnota
   * @returns {number} náhodné číslo
   */
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Vygeneruje dátum narodenia vo formáte ISO.
   *
   * @param {number} ageMin minimálny vek
   * @param {number} ageMax maximálny vek
   * @returns {string} ISO dátum narodenia
   */
  function generateBirthdate(ageMin, ageMax) {

    //==== aktuálny timestamp ====
    const now = Date.now();

    //==== počet milisekúnd v roku ====
    const yearMs = 365.25 * 24 * 60 * 60 * 1000;

    //==== minimálny timestamp ====
    const minTimestamp =
      now - (ageMax * yearMs);

    //==== maximálny timestamp ====
    const maxTimestamp =
      now - (ageMin * yearMs);

    //==== náhodný timestamp ====
    const randomTimestamp =
      getRandomInt(
        Math.floor(minTimestamp),
        Math.floor(maxTimestamp)
      );

    //==== ISO formát ====
    return new Date(randomTimestamp).toISOString();
  }

  //==== výsledné pole ====
  const result = [];

  //==== hlavný cyklus ====
  for (let i = 0; i < dtoIn.count; i++) {

    const gender = getRandom(genders);

    const name =
      gender === "male"
        ? getRandom(fnMale)
        : getRandom(fnFemale);

    const surname =
      gender === "male"
        ? getRandom(snMale)
        : getRandom(snFemale);

    result.push({
      gender: gender,
      birthdate: generateBirthdate(dtoIn.age.min, dtoIn.age.max),
      name: name,
      surname: surname,
      workload: getRandom(workloads)
    });
  }

  //==== výsledok ====
  return result;
}



/**
 * Vypočíta vek z dátumu narodenia.
 *
 * @param {string} birthdate ISO dátum narodenia
 * @returns {number} vek osoby
 */
function calculateAge(birthdate) {

  const today = new Date();

  const birth = new Date(birthdate);

  let age = today.getFullYear() - birth.getFullYear();

  const monthDifference =
    today.getMonth() - birth.getMonth();

  if (
    monthDifference < 0 ||
    (
      monthDifference === 0 &&
      today.getDate() < birth.getDate()
    )
  ) {
    age--;
  }

  return age;
}



/**
 * Vypočíta medián poľa čísel.
 *
 * @param {Array<number>} numbers pole čísel
 * @returns {number} medián
 */
function getMedian(numbers) {

  const sorted =
    [...numbers].sort((a, b) => a - b);

  const middle =
    Math.floor(sorted.length / 2);

  //==== párny počet ====
  if (sorted.length % 2 === 0) {

    return (
      sorted[middle - 1] +
      sorted[middle]
    ) / 2;
  }

  //==== nepárny počet ====
  return sorted[middle];
}



/**
 * Vytvorí štatistiky zamestnancov.
 *
 * @param {Array} employeeList pole zamestnancov
 * @returns {object} štatistiky
 */
function getEmployeeStatistics(employeeList) {

  //==== pole vekov ====
  const ages =
    employeeList.map(employee =>
      calculateAge(employee.birthdate)
    );

  //==== pole úvazkov ====
  const workloads =
    employeeList.map(employee =>
      employee.workload
    );

  //==== ženy ====
  const women =
    employeeList.filter(employee =>
      employee.gender === "female"
    );

  //==== priemerný ženský úvazok ====
  const womenWorkloadAverage =
    women.reduce(
      (sum, woman) =>
        sum + woman.workload,
      0
    ) / women.length;

  //==== výsledný objekt ====
  return {

    total: employeeList.length,

    workload10:
      employeeList.filter(employee =>
        employee.workload === 10
      ).length,

    workload20:
      employeeList.filter(employee =>
        employee.workload === 20
      ).length,

    workload30:
      employeeList.filter(employee =>
        employee.workload === 30
      ).length,

    workload40:
      employeeList.filter(employee =>
        employee.workload === 40
      ).length,

    averageAge:
      Number(
        (
          ages.reduce(
            (sum, age) =>
              sum + age,
            0
          ) / ages.length
        ).toFixed(1)
      ),

    minAge:
      Math.min(...ages),

    maxAge:
      Math.max(...ages),

    medianAge:
      getMedian(ages),

    medianWorkload:
      getMedian(workloads),

    averageWomenWorkload:
      Number(
        womenWorkloadAverage.toFixed(1)
      ),

    sortedByWorkload:
      [...employeeList].sort(
        (a, b) =>
          a.workload - b.workload
      )
  };
}



//=============== Vstup ===============
const dtoIn = {
  count: 50,
  age: {
    min: 19,
    max: 35
  }
};



//=============== Spusti ===============
const dtoOut = main(dtoIn);



//=============== Výpis ====
console.log(dtoOut);



//=============== Výpis na stránke ====
document.body.innerHTML =
  "<pre>" +
  JSON.stringify(dtoOut, null, 2) +
  "</pre>";