-- Database name: treats

-- Document your create tables SQL here
CREATE TABLE treats (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20),
  description VARCHAR(300),
  pic VARCHAR(80)
)


INSERT INTO treats (name, description, pic)
VALUES ('Cupcake', 'A delicious cupcake', '/assets/cupcake.jpg'),
('Donuts', 'Mmmm donuts', '/assets/donuts.jpg');
