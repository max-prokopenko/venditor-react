var doc = new jsPDF();


doc.setFont("times");
doc.setFontType("bold");
doc.setFontSize(26);
doc.text('Company name', 20, 30);

doc.setFontSize(12);
doc.setFontType("normall");
doc.text('Company Oy', 22, 50);
doc.text('Katu 1', 22, 55);
doc.text('00001 Kaupunki', 22, 60);

doc.setFontSize(16);
doc.text('Lasku', 110, 30);
doc.setFontSize(12);
doc.setFontType("normall");
doc.text('Päiväys', 110, 40);
doc.text('Data', 160, 40);
doc.text('Laskunumero', 110, 45);
doc.text('Data', 160, 45);
doc.text('Viitenumero', 110, 50);
doc.text('Data', 160, 50);
doc.text('Tilinumero', 110, 55);
doc.text('Data', 160, 55);
doc.text('Maksuehto', 110, 60);
doc.text('Data', 160, 60);
doc.text('Eräpäivä', 110, 65);
doc.text('Data', 160, 65);
doc.text('Viivästyskorko', 110, 70);
doc.text('Data', 160, 70);
doc.text('Valuutta', 110, 75);
doc.text('Data', 160, 75);
doc.text('Toimituspnm', 110, 80);
doc.text('Data', 160, 80);

doc.setFontType("bold");
doc.text('Lisätietoja:', 20, 100);
doc.setFontType("normal");
doc.text('Data', 20, 110);

doc.setFontType("bold");
doc.text('Tuote', 20, 123);
doc.text('Määrä', 60, 123);
doc.text('Yksikkö', 80, 123);
doc.text('Yks. hinta', 115, 123);
doc.text('Veroton arvo', 150, 123);
doc.text('Alv-%', 185, 123);

doc.line(20, 125, 200, 125); // horizontal line

doc.setFontType("normal");
doc.text('Data', 20, 131);
doc.text('Data', 60, 131);
doc.text('Data', 80, 131);
doc.text('Data', 115, 131);
doc.text('Data', 150, 131);
doc.text('Data', 185, 131);

//doc.line(100, 20, 100, 60); // vertical line

doc.text('Veroton arvo yhteensä', 100, 150);
doc.text('Alv', 100, 155);
doc.setFontType("bold");
doc.text('Summa yhteensä', 100, 160);


doc.setFontType("normal");
doc.text('Data', 170, 150);
doc.text('Data', 170, 155);
doc.setFontType("bold");
doc.text('Data', 170, 160);


doc.line(20, 190, 200, 190);
doc.setFontType("normal");
doc.setFontSize(10);
doc.text('Company Oy', 20, 194);
doc.text('Osoite', 20, 198);
doc.text('Osoite', 20, 202);

doc.text('Y-tunnus', 95, 194);
doc.text('ALV-tunnus', 95, 198);
doc.text('Kotipaikka', 95, 202);

doc.text('Puhelin', 165, 194);
doc.text('Sähköposti', 165, 198);
doc.text('Kotisivu', 165, 202);

doc.line(10, 217, 205, 217);

doc.line(110, 217, 110, 290);
doc.line(35, 217, 35, 255);

doc.setFontSize(8);
doc.text('Saajan tilinumero', 10, 225);
doc.text('IBAN', 50, 225);
doc.text('BIC', 120, 225);
doc.setFontSize(12);
doc.text('FI12 3456 7890 0000 11', 50, 235);
doc.text('NDEAFIHH', 120, 235);
doc.line(10, 240, 205, 240);

doc.setFontSize(8);
doc.text('Saaja', 10, 247);
doc.setFontSize(10);
doc.text('Company oy', 50, 248);
doc.line(10, 255, 110, 255);

doc.setFontSize(8);
doc.text('Maksaja', 10, 265);
doc.setFontSize(10);
doc.text('Company2 oy', 50, 265);
doc.text('Katu 1', 50, 270);
doc.text('00001 Kaupunki', 50, 275);
doc.line(10, 278, 205, 278);

doc.setFontSize(8);
doc.line(110, 268, 205, 268);
doc.text('Viitenro', 112, 274);
doc.setFontSize(10);
doc.text('100 09936', 130, 274);
doc.line(125, 268, 125, 290);
doc.line(10, 290, 205, 290);

doc.setFontSize(8);
doc.text('Eräpäivä', 112, 285);
doc.setFontSize(10);
doc.text('1.5.2017', 130, 287);

doc.line(165, 278, 165, 290);

doc.setFontSize(8);
doc.text('Euro', 167, 282);
doc.setFontSize(12);
doc.text('99.95', 175, 287);