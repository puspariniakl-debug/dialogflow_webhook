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
    { waktu: "09.30 - 11.20", mapel: "matematika" }

    
  ],
  rabu: [
    { waktu: "07.30 - 08.50", mapel: "sejarah" }
  ],
  kamis: [
    { waktu: "07.30 - 08.50", mapel: "bahasa indonesia" }
  ],
  jumat: [
    { waktu: "07.30 - 08.50", mapel: "seni budaya" }
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
