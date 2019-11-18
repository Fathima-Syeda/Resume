/* function during page load */
function onPageLoad() {

    // Loading JSON data using jQuery
    $.getJSON("assets/resume.json", function(resume) {
        generateHTML(resume);
    });

}

/* jQuery function to generate HTML page */
function generateHTML(resume) {
    $("body").addClass("text-justify px-5 pb-4");

    // calling function to create sections
    createSections(resume.sectionTitles);

    // looping through JSON object to create sub sections
    for (let property in resume) {
        if (Array.isArray(resume[property])) {
            createSubSections(property, resume[property]);
        }
    }
}

/* function to create different sections */
function createSections(list) {
    $("body").append("<div id='print' class='row justify-content-end p-3'><button onclick='onPrint()' class='hide-print btn btn-primary btn-sm float-right'>" +
        "<span class='fas fa-print'></span> Print </button></div>");

    // looping through list of sections
    for (let item in list) {
        let titleId = list[item].replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        $("body").append(
            "<div id ='" + titleId + "' class='font-weight-normal'></div>"
        );
        if (titleId !== "contactdetails") {
            $("#" + titleId).append(
                "<h5 class='text-primary'>" + list[item] + "</h5>"
            );
        } else {
            $("#" + titleId).addClass("d-flex justify-content-between");
        }
    }
}

/* function to create different sub-sections */
function createSubSections(parentId, list) {
    let subTitleId = "";
    let subList = "";

    // looping through list of sub sections 
    for (let item in list) {
        if (typeof list[item] === "object") {
            switch (parentId) {

                case "contactDetails":

                    parentId = parentId.toLowerCase();
                    let subSectionId = parentId + "Sub";

                    $("#" + parentId).append(
                        "<div id='" + subSectionId + "'class='text-left'</div>"
                    );
                    $("#" + subSectionId).append(
                        "<h3 class='text-primary mb-0'>" + list[item].name + "</h3>"
                    );
                    $("#" + subSectionId).append(
                        "<h5 class='font-weight-normal mb-0'>" +
                        list[item].position +
                        "</h5>"
                    );
                    $("#" + subSectionId).append(
                        "<address>" +
                        list[item].city +
                        ", " +
                        list[item].state +
                        "<br>" +
                        list[item].phone +
                        " | <span class='text-primary'><u>" +
                        list[item].email +
                        "</u></span></address>"
                    );
                    $("#" + parentId).append(
                        "<img src='" +
                        list[item].image +
                        "' class='img-thumbnail rounded img'></img>"
                    );
                    break;

                case "summary":
                    $("#" + parentId).append("<p>" + list[item].summaryText + "</p>");
                    break;

                case "skills":
                    subTitleId = list[item].skillName.toLowerCase();

                    $("#" + parentId).append(
                        "<h5 class='text-primary font-weight-normal'>" +
                        list[item].skillName +
                        "</h5>"
                    );
                    $("#" + parentId).append("<ul id='" + subTitleId + "'></ul>");

                    subList = list[item].skills;
                    break;

                case "experience":
                    subTitleId = list[item].companyName
                        .replace(/[^a-zA-Z0-9]/g, "")
                        .toLowerCase();
                    $("#" + parentId).append(
                        "<div class='d-flex justify-content-between'>" +
                        "<h5 class='text-primary text-left font-weight-normal'>" +
                        list[item].companyName +
                        "</h5>" +
                        "<h5 class='text-primary text-right font-weight-normal'>" +
                        list[item].startDate +
                        " - " +
                        list[item].endDate +
                        "</h5></div>"
                    );
                    $("#" + parentId).append("<ul id='" + subTitleId + "'></ul>");

                    subList = list[item].responsibilities;
                    break;

                case "education":
                    subTitleId = list[item].degree
                        .replace(/[^a-zA-Z0-9]/g, "")
                        .toLowerCase();
                    $("#" + parentId).append(
                        "<div class='d-flex justify-content-between'>" +
                        "<p class='text-left'>" +
                        list[item].degree +
                        " from " +
                        list[item].institute +
                        "</p>" +
                        "<p class='text-right'>" +
                        list[item].startYear +
                        " - " +
                        list[item].endYear +
                        "</p>" +
                        "</div>"
                    );
                    break;

                case "certifications":
                    subTitleId = parentId + "sub";
                    $("#" + parentId).append("<ul id='" + subTitleId + "'></ul>");

                    $("#" + subTitleId).append(
                        "<li><p>" +
                        list[item].course +
                        " (" +
                        "<a href='" +
                        list[item].url +
                        "'>" +
                        list[item].url +
                        "</a>)</p></li>"
                    );
                    break;

                default:
                    break;
            }
        }
    }

    // to generate list 
    if (subList !== "" && subList.length > 0) {
        for (let item in subList) {
            $("#" + subTitleId).append("<li>" + subList[item] + "</li>");
        }
    }
}

/* function to print resume */
function onPrint() {
    window.print();
}