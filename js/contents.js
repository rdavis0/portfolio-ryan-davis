const links = [{
        label: "Week 1",
        url: "notes/week1.html"
    },
    {
        label: "Week 3",
        url: "notes/week3.html"
    },
    {
        label: "Week 4",
        url: "notes/week4.html"
    }
]

function generateContents() {
    var list = document.getElementById("table-of-contents");
    for (i in links) {
        var node = document.createElement("li");
        var anchor = document.createElement("a");
        anchor.setAttribute("href", links[i].url);
        anchor.innerText = links[i].label;
        node.appendChild(anchor);
        list.appendChild(node);
    };
}

generateContents();