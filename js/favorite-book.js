function getBooks() {
    let bookids = []; 
    console.log("start met ophalen")
    fetch("http://localhost:8080/book/all")
        .then(response => response.json())
        .then(data =>{
            data.forEach(book => {
                bookids.push(book.id);
            });
            findAllFavs(bookids);
        })
    console.log("Na fetch") 
}


function findAllFavs(bookids) {
    let userId = localStorage.getItem("WT_ID");
    let favids = [];
    console.log("start met ophalen")
    fetch(`http://localhost:8080/favorite/all/${userId}`)
        .then(response => response.json())
        .then(data =>{
            data.forEach(favorite => {
                favids.push(favorite.bookId);
            });
            console.log("USER:", userId);
            console.log("FAVBOOKS:", data);
            console.log(bookids)
            for (let book of bookids){
                console.log(book)
                let favButton = document.getElementById(`fav${book}`);
                if (favids.includes(book)) {
                    console.log("YES")
                    favButton.innerHTML = '<i class="fas fa-heart"></i>';
                } else {
                    console.log("NO")
                    favButton.innerHTML = '<i class="far fa-heart"></i>';
                }
                
            }
        })
    console.log("Na fetch")
}


function saveFavorite(bookId) {
    let userId = localStorage.getItem("WT_ID");
    
    let obj = {
        "bookId": bookId,
        "userId": userId
    }

    fetch("http://localhost:8080/favorite/save", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("WT_TOKEN")
        },
        body: JSON.stringify(obj)
    })
    .then((response) => response.json())
}


function deleteFavorite(bookId) {
    let userId = localStorage.getItem("WT_ID");
    
    let obj = {
        "bookId": bookId,
        "userId": userId
    }
    
    fetch("http://localhost:8080/favorite/delete", {
        method: "DELETE", // Use the HTTP DELETE method to delete the favorite
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("WT_TOKEN")
        },
        body: JSON.stringify(obj)
    })
    .then((response) => {
        if (response.status === 200) {
            console.log("Favorite deleted successfully");
        } else {
            console.log("Failed to delete favorite");
        }
    });
}

function saveOrDel(bookId){
    let favButton = document.getElementById(`fav${bookId}`);
    let heartIcon = favButton.querySelector("i.fa-heart");
    if (heartIcon.classList.contains("far")) { //Favorites book
        console.log("Favorite")
        heartIcon.classList.remove("far");
        heartIcon.classList.add("fas");
        // Save Book to favorites in db...
        // document.getElementById('addFav').innerHTML = "<span class='addFav'>Verwijder van favorieten</span>";
        saveFavorite(bookId)

    } else { //Unfavorites book
        console.log("Unfavorite")
        heartIcon.classList.remove("fas");
        heartIcon.classList.add("far");
        // Remove Book from favorites in db...
        // document.getElementById('addFav').innerHTML ="<span class='addFav'>Toevoegen aan favorieten</span>";
        deleteFavorite(bookId);
    }
}

getBooks();