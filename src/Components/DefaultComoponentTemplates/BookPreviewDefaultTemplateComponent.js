import React from 'react';

function BookPreviewDefaultTemplateComponent(defaultComponent, componetnId, componentType, componentName) {

     defaultComponent = {
      _type: "bookPreviewComponent",
      title: "Enter title here",
      books: [
        {
          _key: "book1",
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          imageUrl:
            "https://rijnbrink.hostedwise.nl/cgi-bin/momredir.pl?size=245&lid=2021102123;ppn=432487301;isbn=9789076174181;key=1014645;",
        },
        {
          _key: "book2",
          title: "1984",
          author: "George Orwell",
          imageUrl:
            "https://leibniz.zbkb.nl/assets/id/PPN%3A443094276?aid=ob-overijssel-lokaal-waas&sid=15&dts=1744161529349&sig=0063574ada1944a80ab3ecf23c7b89cccb05385805adb174935fbe8ee7018ac9&width=165",
        },
        {
          _key: "book3",
          title: "To Kill a Mockingbird",
          author: "Harper Lee",
          imageUrl:
            "https://webcat.hostedwise.nl/cgi-bin/momredir.pl?s…239;ppn=443893454;isbn=9789402716740;key=1759452;",
        },
        {
          _key: "book4",
          title: "Moby Dick",
          author: "Herman Melville",
          imageUrl:
            "https://leibniz.zbkb.nl/assets/id/PPN%3A443012806?aid=ob-veenendaal-lokaal-waas&sid=15&dts=1744181465721&sig=94d8c10101d381ff5565bcd3c9d2e2012a77dc933796b3d1fb0dc215c4199bb1&width=100",
        },
        {
          _key: "book5",
          title: "Pride and Prejudice",
          author: "Jane Austen",
          imageUrl:
            "https://leibniz.zbkb.nl/assets/id/PPN%3A443106363?aid=ob-overijssel-lokaal-waas&sid=15&dts=1744161529349&sig=985401a1ada03c70337ad21a31eef6940eeedcfce6984be86575a03c593ac8a2&width=165",
        },
        {
          _key: "book6",
          title: "The Catcher in the Rye",
          author: "J.D. Salinger",
          imageUrl:
            "https://leibniz.zbkb.nl/assets/id/PPN%3A443764743?aid=ob-veenendaal-lokaal-waas&sid=15&dts=1744181465721&sig=b30e0ba35772fa8fa9e1db97df69ecbdc19072f2d2f4d252991086019b25de12&width=100",
        },
        {
          _key: "book7",
          title: "Jane Eyre",
          author: "Charlotte Brontë",
          imageUrl:
            "https://rijnbrink.hostedwise.nl/cgi-bin/momredir.pl?size=245&lid=2011271324;ppn=330312944;isbn=9789061699811;key=372195;",
        },
        {
          _key: "book8",
          title: "Frankenstein",
          author: "Mary Shelley",
          imageUrl:
            "https://images-na.ssl-images-amazon.com/images/I/91b0C2YNSrL.jpg",
        },
        {
          _key: "book9",
          title: "Wuthering Heights",
          author: "Emily Brontë",
          imageUrl:
            "https://rijnbrink.hostedwise.nl/cgi-bin/momredir.pl?size=245&lid=2011271321;ppn=33031291X;isbn=9789061699781;key=372191;",
        },
        {
          _key: "book10",
          title: "Brave New World",
          author: "Aldous Huxley",
          imageUrl:
            "https://rijnbrink.hostedwise.nl/cgi-bin/momredir.pl?size=245&lid=1998440171;ppn=440183839;isbn=9789463361729;key=2238716;",
        },
        {
          _key: "book11",
          title: "The Hobbit",
          author: "J.R.R. Tolkien",
          imageUrl:
            "https://images-na.ssl-images-amazon.com/images/I/91b0C2YNSrL.jpg",
        },
        {
          _key: "book12",
          title: "Animal Farm",
          author: "George Orwell",
          imageUrl:
            "https://images-na.ssl-images-amazon.com/images/I/71kxa1-0mfL.jpg",
        },
      ],
      styling: JSON.stringify({
        container: {
          gap: "20px",
          padding: "0 2rem",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          boxSizing: "border-box",
        },
        bookCard: {
          flex: "1 1 150px",
          maxWidth: "150px",
          margin: "1rem 0",
          textAlign: "center",
        },
        image: {
          width: "50px",
          height: "150px",
          minWidth: "100px",
          borderRadius: "8px",
        },
        title: {
          marginTop: "0.5rem",
          fontWeight: "600",
          fontSize: "1rem",
          textDecoration: "none",
          color: "#1a1a1a",
          display: "block",
        },
        author: {
          fontSize: "0.9rem",
          color: "#666",
        },
      }),
    };
    return defaultComponent;
}

export default BookPreviewDefaultTemplateComponent;