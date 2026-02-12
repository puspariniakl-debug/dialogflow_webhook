const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const jadwal = {
  senin: [
    { waktu: "08.10 - 09.30", mapel: "agama hindu" },
    { waktu: "09.30 - 15.00", mapel: "dasar dasar akuntansi" }
   
  ],
  selasa: [
    { waktu: "07.30 - 09.30", mapel: "pjok" },
    { waktu: "09.30 - 11.20", mapel: "matematika" },
    { waktu: "11.20 - 15.40", mapel: "ipas" }
    
  ],
  
  rabu: [
    { waktu: "07.30 - 08.50", mapel: "sejarah" }, 
    { waktu: "08.30 - 13.20", mapel: "dasar dasar akuntansi" }, 
    { waktu: "13.40 - 15.00", mapel: "KKa" } 
  ],
  kamis: [
    { waktu: "07.30 - 08.50", mapel: "bahasa indonesia" }, 
   { waktu: "08.50 - 12.00", mapel: "informatika" },
    { waktu: "12.00 - 15.00", mapel: "bahasa inggris" },
     { waktu: "15.00 - 15.40", mapel: "BK" }
  ],
  jumat: [
    { waktu: "07.30 - 08.50", mapel: "seni budaya" },
     { waktu: "09.30 - 11.20", mapel: "pkn" },
     { waktu: "11.20 - 12.40", mapel: "bahasa indonesia" },
     { waktu: "12.40 - 14.20", mapel: "bahasa bali" },
    { waktu: "14.20 - 15.40", mapel: "matematika" }


  ]  
};

app.post("/webhook", (req, res) => {
  const hari = req.body.queryResult.parameters.hari;

  if (!jadwal[hari]) {
    return res.json({
      fulfillmentText: `Maaf, jadwal untuk hari ${hari} tidak ditemukan.`
    });
  }

  let responseText = `Jadwal hari ${hari}:\n`;

  jadwal[hari].forEach(item => {
    responseText += `${item.waktu} - ${item.mapel}\n`;
  });

  res.json({
    fulfillmentText: responseText
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server berjalan di port " + PORT);
});
