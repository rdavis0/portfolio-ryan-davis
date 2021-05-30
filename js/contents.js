const links = [{
        label: "Week 1",
        url: "week1/notes.html"
    },
    {
        label: "Week 3",
        url: "week3/notes.html"
    },
    {
        label: "Week 4",
        url: "week4/notes.html"
    },
    {
        label: "Week 5",
        url: "week5/notes.html"
    },
    {
        label: "Week 6 / Todo application",
        url: "week6/todo.html"
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