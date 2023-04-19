const links = [{
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
        label: "Todo application",
        url: "week6/todo.html"
    },
    {
        label: "Week 7",
        url: "week7/notes.html"
    },
    {
        label: "Week 8",
        url: "week8/notes.html"
    },
    {
        label: "Week 9",
        url: "week9/notes.html"
    },
    {
        label: "Week 10",
        url: "week10/notes.html"
    }, 
    {
        label: "Week 11",
        url: "week11/notes.html"
    },
    {
        label: "Challenge Proposal",
        url: "challenge/proposal/proposal.html"
    },
    {
        label: "Challenge",
        url: "challenge"
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