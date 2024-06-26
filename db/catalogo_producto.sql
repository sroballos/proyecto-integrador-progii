CREATE SCHEMA catalogo_producto;
USE catalogo_producto;

CREATE TABLE users (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(25) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    passW VARCHAR(100) NOT NULL,
    dateBorn DATETIME,
    dni INT NOT NULL,
    profilePic VARCHAR(100),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAT TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
    );

CREATE TABLE products(
	user_id INT UNSIGNED,
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    artist VARCHAR (100) NOT NULL,
    release_date DATE NOT NULL,
    image VARCHAR(100) NOT NULL,
    description TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	deletedAt TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id)
    
    );
    
CREATE TABLE comments (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    id_user INT UNSIGNED,
    id_products INT UNSIGNED,
    coment TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt  TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id),
    FOREIGN KEY (id_products) REFERENCES products(id)
   
);

INSERT INTO catalogo_producto.users(username, email, dateBorn, dni, profilePic)
VALUES("Paul Mccartney", "paul@mccartney.com", 1945-05-05, 0, "mccartney.jpg"),
("Mick Jagger", "jagger@rollingstones.com", 1943-03-20, 2, "mick-jagger.jpg"),
("Sebas","sroballos@udesa.edu.ar", 2005-04-29, 46197272, null),
("Messi","leonel@messi.com", 1987-06-24, 28675493, null);    

INSERT INTO products (user_id, title, artist, release_date, image, description)
 VALUES (1, "Abbey Road", "The Beatles", "1969-09-26", "abbeyroad.jpg", "El mejor álbum en la historia de la música."),
        (2, 'The Best of Sade', 'Sade', '1994-10-31', 'thebestofsade.jpg', 'The Best of Sade es el primer álbum de grandes éxitos de la banda británica Sade, publicado por Epic Records en el Reino Unido el 31 de octubre de 1994 y en los Estados Unidos el 4 de noviembre de 1994.'),
		(3, 'The Divine Feminine', 'Mac Miller', '2016-09-16', 'thedivinefeminine.jpg', 'The Divine Feminine —en español: La Divina Femenina — es el cuarto álbum de estudio del rapero estadounidense Mac Miller. Fue lanzado el 16 de septiembre de 2016 por REMember Music y Warner Bros. Records.'),
		(4, 'nadie sabe lo que va a pasar mañana', 'Bad Bunny', '2023-10-13', 'nadiesabeloquevaapasarmañana.jpg', 'Nadie sabe lo que va a pasar mañana es el quinto álbum de estudio del cantante puertorriqueño Bad Bunny. El álbum fue publicado el viernes 13 de octubre de 2023 a través de Rimas Entertainment, precediendo el lanzamiento de su anterior álbum Un verano sin ti.'),
		(1, 'Oktubre', 'Patricio Rey y sus Redonditos de Ricota', '1986-10-04', 'oktubre.jpg', 'Oktubre es el segundo álbum de estudio del grupo de rock argentino Patricio Rey y sus Redonditos de Ricota. Fue editado en octubre de 1986.'),
		(2, 'Never Too Much', 'Luther Vandross', '1981-07-23', 'nevertoomuch.jpg', 'Never Too Much es el álbum de estudio debut en solitario del cantante estadounidense Luther Vandross, lanzado el 12 de agosto de 1981 por Epic Records. Compuesto en su mayor parte por el propio Vandross, el álbum alcanzó el puesto 19 en el Billboard 200 de EE. '),
		(3, 'Dark Lane Demo Tapes', 'Drake', '2020-05-01', 'darklanedemotapes.jpg', 'Dark Lane Demo Tapes es el sexto mixtape del rapero canadiense Drake. El mixtape es una recopilación de canciones que se lanzaron en SoundCloud o se filtraron en Internet, así como canciones nuevas, y se considera un "calentamiento" para el sexto álbum de estudio de Drake, Certified Lover Boy.'),
		(4, '111', 'Milo j', '2023-11-30', '111.jpg', '111 es el primer álbum de estudio del cantante argentino Milo J. Fue lanzado por Dale Play Records el 30 de noviembre de 2023. Cada canción cuenta con su video musical excepto «Dom1ngo».​ Contiene colaboraciones con Yami Safdie, Yahritza y su Esencia, Peso Pluma y Nicki Nicole.​'),
		(1, 'Getz/Gilberto (Expanded Edition)', 'Stan Getz', '1964-01-01', 'getzgilberto.jpg', 'Getz/Gilberto es un álbum de jazz/bossa nova del saxofonista estadounidense Stan Getz y el guitarrista brasileño João Gilberto, acompañados del pianista y compositor Antônio Carlos Jobim. '),
		(2, 'Soda Stereo (Remastered)', 'Soda Stereo', '1984-02-06', 'sodastereo.jpg', 'Soda Stereo es el nombre del álbum debut de estudio homónimo grabado por el grupo argentino Soda Stereo. Fue lanzado al mercado bajo el sello discográfico CBS Discos el 27 de agosto de 1984. La producción de este álbum debut estuvo a cargo de Federico Moura, vocalista y líder de Virus.'),
		(3, 'This Old Dog', 'Mac DeMarco', '2017-05-05', 'thisolddog.jpg', 'This Old Dog es el tercer álbum de estudio de larga duración del cantautor y multiinstrumentista Mac DeMarco, lanzado el 5 de mayo de 2017 a través de Captured Tracks. Tras el lanzamiento de Another One, DeMarco se mudó de su aislado hogar de Queens a una casa en Los Ángeles para crear el álbum.'),
        (4, 'Revolver', 'The Beatles', '1966-08-5', 'revolver.webp', 'Revolver es el séptimo álbum de estudio de la banda británica de rock The Beatles lanzado el 5 de agosto de 1966 por EMI. Fue el último álbum lanzado antes de que la banda decidiera abandonar los escenarios y las giras, a favor de la experimentación en los estudios de grabación. Ha sido considerado como uno de los álbumes más grandes e innovadores en la historia de la música popular, con reconocimiento centrado en su variedad de estilos musicales, diversos sonidos y contenido lírico. ');


INSERT INTO catalogo_producto.comments
VALUES('4', '1', '1', 'ABBEY ROAD', '2024-06-10 17:48:35', '2024-06-10 17:48:35', null),
('5', '2', '1', 'Sucked. Couldnt get me No Satisfaction', '2024-06-10 18:09:02', '2024-06-10 18:09:30', null)