
function select_anomaly(event)
{
    const anomalies = document.querySelectorAll('.anomalies');
    anomalies.forEach(element => {
        element.style.display = "none";    
    });
    const anomaly_set_1_value = document.getElementById('anomaly-set-1').value;
    localStorage.setItem("m1-anomaly-set-1", anomaly_set_1_value);
    const anomaly_set_2_value = document.getElementById('anomaly-set-2').value;
    localStorage.setItem("m1-anomaly-set-2", anomaly_set_2_value);
    let anomaly = document.querySelector("." + anomaly_set_1_value);
    if (anomaly)
        anomaly.style.display = "block";
    anomaly = document.querySelector("." + anomaly_set_2_value);
    if (anomaly)
        anomaly.style.display = "block";
}

function select_datasheet(event)
{
    const datasheets = document.querySelectorAll('.datasheet');
    const selection = document.querySelector("." + event.target.value);
    localStorage.setItem("m1-select-datasheet", event.target.value);
    if (selection)
    {
        datasheets.forEach(element => {element.style.display = "none"});
        selection.style.display = "block";
    }
    else
    {
        datasheets.forEach(element => {element.style.display = "block"});
    }
}

function select_tactical_agenda(event)
{
    const tactical_agendas = document.querySelectorAll(".tactical-agenda");
    tactical_agendas.forEach(element => {element.style.display = "none"});
    const tactical_agenda = document.querySelector("." + event.target.value);
    localStorage.setItem("m1-select-tactical-agenda", event.target.value);
    if (tactical_agenda)
        tactical_agenda.style.display = "block";
}

document.addEventListener('DOMContentLoaded', (event) => {
    const anomaly_set_1 = document.getElementById('anomaly-set-1');
    anomaly_set_1.addEventListener("change", (event) => {select_anomaly(event)});
    anomaly_set_1.value = localStorage.getItem("m1-anomaly-set-1") || "none";
    
    const anomaly_set_2 = document.getElementById('anomaly-set-2');
    anomaly_set_2.addEventListener("change", (event) => {select_anomaly(event)});
    anomaly_set_2.value = localStorage.getItem("m1-anomaly-set-2") || "none";
    anomaly_set_2.dispatchEvent(new Event("change"));

    const datasheet = document.getElementById("datasheet-selector");
    datasheet.addEventListener("change", (event) => {select_datasheet(event)});
    datasheet.value = localStorage.getItem("m1-select-datasheet") || "none";
    datasheet.dispatchEvent(new Event("change"));

    const tactical_agenda = document.getElementById("tactical-agenda-set");
    tactical_agenda.addEventListener("change", (event) => {select_tactical_agenda(event)});
    tactical_agenda.value = localStorage.getItem("m1-select-tactical-agenda") || "none";
    tactical_agenda.dispatchEvent(new Event("change"));
});