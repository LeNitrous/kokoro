module.exports = {
    name: "bandoriNewBirthday",
    time: "00 00 00 * * *",
    timezone: "Asia/Tokyo",
    task: (Kokoro) => {
        var data = require("../../data.json");
        var birthday = birthdays.filter(item => isToday(item.date))[0];
        if (!birthday) return;
        for (var val in data) {
            if (data.hasOwnProperty(val)) {
                if (data[val].bandori_birthdayChannel) {
                    Kokoro.guilds.find("id", val)
                        .channels.find("id", data[val].bandori_birthdayChannel)
                        .send(`**[Birthday]** Today is ${birthday.celebrant}'s birthday!\n\n${birthday.message}`,
                            {files: [
                                {attachment: birthday.image, name: "image.jpg"}
                            ]});
                }
            }
        }
    }  
}

function isToday(date) {
    var today = new Date();
    var target = new Date(date);
    if (today.getMonth() == target.getMonth() && today.getDate() == target.getDate())
        return true;
    else
        return false;
}

var birthdays = [  
    {  
       "date": 963500400000,
       "celebrant": "Kasumi Toyama",
       "message": "The girl who always dreams of becoming a (literal) star! She's leader, guitarist, and vocalist of Poppin'Party.",
       "image": "https://i.bandori.party/u/c/art/503Kasumi-Toyama-Happy-2RRAER.png"
    },
    {  
       "date": 975855600000,
       "celebrant": "Tae Hanazono",
       "message": "A hardworking skilled guitar player that loves music. She's the guitarist of Poppin'Party.",
       "image": "https://i.bandori.party/u/c/art/507Tae-Hanazono-Pure-iePZKC.png"
    },
    {  
       "date": 953737200000,
       "celebrant": "Rimi Ushigome",
       "message":"Being the younger sister of Yuri Ushigome the bassist of Glitter*Green, she aspires to become like her sister. She's the bassist of Poppin'Party.",
       "image":"https://i.bandori.party/u/c/art/511Rimi-Ushigome-Cool-F3HxqH.png"
    },
    {  
       "date": 958662000000,
       "celebrant": "Saya Yamabuki",
       "message": "Saya is a kind-hearted soul being on good terms with Kasumi since the school opening ceremony. The former drummer of ChiSPA now playing for Poppin'Party.",
       "image": "https://i.bandori.party/u/c/art/515Saaya-Yamabuki-Power-6qbcou.png"
    },
    {  
       "date": 972572400000,
       "celebrant": "Arisa Ichigaya",
       "message": "Arisa's sharp tongue and shut-in nature causes her to butt heads with Kasumi far too often. She plays the keyboard for Poppin'Party.",
       "image": "https://i.bandori.party/u/c/art/519Arisa-Ichigaya-Happy-2szb4D.png"
    },
    {  
       "date": 955292400000,
       "celebrant": "Ran Mitake",
       "message": "Ran treasures her childhood friends and family more than anything else and has a strong passion with music. She is the leader, guitar, and vocalist of Afterglow.",
       "image": "https://i.bandori.party/u/c/art/523Ran-Mitake-Power-ZPchJv.png"
    },
    {  
       "date": 967906800000,
       "celebrant": "Moca Aoba",
       "message": "Moca tends to focus on things she likes but will do anything for anyone she loves. She plays the guitar for Afterglow.",
       "image": "https://i.bandori.party/u/c/art/527Moca-Aoba-Happy-dkHY2l.png"
    },
    {  
       "date": 972226800000,
       "celebrant": "Himari Uehara",
       "message": "The supposed leader of Afterglow!? Himari is a dense girl and her efforts always tend to go to waste and is easily moved by touching things. She always keeps the band together being a good-natured girl. She is the bassist of Afterglow.",
       "image": "https://i.bandori.party/u/c/art/531Himari-Uehara-Pure-eeixHa.png"
    },
    {  
       "date": 955724400000,
       "celebrant": "Tomoe Udagawa",
       "message": "The older sister of Ako Udagawa the drummer of Roselia. Tomoe tends to go along well with people around her with her nature and plays an important role for her band to keep moving forward. She is the drummer of Afterglow.",
       "image": "https://i.bandori.party/u/c/art/535Tomoe-Udagawa-Cool-An4aHD.png"
    },
    {  
       "date": 947170800000,
       "celebrant": "Tsugumi Hazawa",
       "message": "The most ordinary girl of the band. Tsugumi keeps the band's spirits high with her positive and cheery outlook. She plays the keyboard for Afterglow.",
       "image": "https://i.bandori.party/u/c/art/539Tsugumi-Hazawa-Power-L00oAL.png"
    },
    {  
       "date": 965660400000,
       "celebrant": "Tsurumaki Kokoro",
       "message": "\"Making the whole world smile!\" is her motto. Kokoro is extremely curious by nature and basically loves anything. Her eyes glitter whenever she encounters something new. She is the leader and vocalist of Hello, Happy World!",
       "image": "https://i.bandori.party/u/c/art/728Kokoro-Tsurumaki-Happy-a0GhSG.png"
    },
    {  
       "date": 951663600000,
       "celebrant": "Kaoru Seta",
       "message": "Ephemeral... Kaoru is a stage actress and is a childhood friend of Chisato Shirasagi the bassist of Pastel＊Palettes who isn't technically on good terms with. She enjoys classical literature but does not understand it. She is the guitar of Hello, Happy World!",
       "image": "https://i.bandori.party/u/c/art/547Kaoru-Seta-Cool-J2UwgQ.png"
    },
    {  
       "date": 964882800000,
       "message": "Hagumi is a bright, active girl who loves to do sporty things being the captain of the local softball team. She's classmates with Eve and Kasumi. She is the bassist of Hello, Happy World!",
       "image": "https://i.bandori.party/u/c/art/551Hagumi-Kitazawa-Happy-vYyX7F.png"
    },
    {  
       "date": 957970800000,
       "celebrant": "Kanon Matsubara",
       "message": "Kanon is clumsy, shy, and nervous in nature. She tends to get caught in matters she isn't a part off and always tends to lose her direction. She is also good friends with Chisato. She plays the drums for Hello, Happy World!",
       "image": "https://i.bandori.party/u/c/art/555Kanon-Matsubara-Pure-QXof10.png"
    },
    {  
       "date": 970326000000,
       "celebrant": "Misaki Okusawa (Michelle)",
       "message": "",
       "image": "https://i.bandori.party/u/c/art/559Michelle-Happy-vr9GIq.png"
    },
    {  
       "date": 977842800000,
       "celebrant": "Aya Maruyama",
       "message": "A big fan of idols that aspires to become one that is famous, Aya made her breakthrough joining an idol band. She tends to get worked up and cry easily and has stage-fright and inability to improvise in dire situations. She is the leader and vocalist of Pastel＊Palettes.",
       "image": "https://i.bandori.party/u/c/art/563Aya-Maruyama-Pure-MBGuks.png"
    },
    {  
       "date": 953478000000,
       "celebrant": "Hina Hikawa",
       "message": "The younger twin sister of Sayo Hikawa, Roselia's guitarist. She is a true genius and ables to do anything after one single demonstration. She is a cheerful and candid girl, who is not good at understanding feelings of others. She is the guitarist of Pastel＊Palettes.",
       "image": "https://i.bandori.party/u/c/art/567Hina-Hikawa-Power-c0ONW0.png"
    },
    {  
       "date": 954946800000,
       "celebrant": "Chisato Shirasagi",
       "message": "Chisato has been a famous actress since childhood. She has then learned to cherish her private life and the friends therein. She is friends with Kaoru and Kanon. She is also the bassist of Pastel＊Palettes.",
       "image": "https://i.bandori.party/u/c/art/571Chisato-Shirasagi-Cool-zDUkRH.png"
    },
    {  
       "date": 973177200000,
       "celebrant": "Maya Yamato",
       "message": "A true equipment geek. Maya tends to get carried away whenever she's surrounded by music equipment. She is the drummer of Pastel＊Palettes.",
       "image": "https://i.bandori.party/u/c/art/575Maya-Yamato-Pure-e2ZVcw.png"
    },
    {  
       "date": 962031600000,
       "celebrant": "Eve Wakamiya",
       "message": "\"Bushido!\" is the way of the samurai and Eve has ever since loved that word. Being from Finland and half-Japanese half-Finnish, she has always been interested in Japanese culture. She is also a model at her agency and is the keyboard of Pastel＊Palettes.",
       "image": "https://i.bandori.party/u/c/art/579Eve-Wakamiya-Happy-4irMsB.png"
    },
    {  
       "date": 972486000000,
       "celebrant": "Yukina Minato",
       "message": "She is geniune by nature who never questions herself. Whenever she feels strongly about something, there's nothing you can change her mind. She rarely smiles or laughs in front of others. She is also the leader and vocalist of Roselia.",
       "image": "https://i.bandori.party/u/c/art/583Yukina-Minato-Happy-DYUUqX.png"
    },
    {  
       "date": 953478000000,
       "celebrant": "Sayo Hikawa",
       "message": "A serious and fussy girl, Sayo can come off as somewhat cold in nature. She would never cut corners or be shoddy about things; because of that, she lives her life too seriously for her own good. She's the older twin sister of Hikawa Hina. She has a complex and feels inferior to her twin sister. She is also the guitarist of Roselia.",
       "image": "https://i.bandori.party/u/c/art/587Sayo-Hikawa-Cool-Z9JRZx.png"
    },
    {  
       "date": 967129200000,
       "celebrant": "Lisa Imai",
       "message": "With her flamboyant looks, Lisa is easily misunderstood as frivolous, but is actually a compassionate and faithful person. She has a lot of friends due to her stylishness and bright personality. Lisa follows gal fashion, but keeps her interest in knitting a secret, since it does not match her image. She is a proficient bassist, wowing the other Roselia members in her audition, and is good at baking cookies. She is best friends with Yukina. Outside of the band, she is also friends with Aoba Moca. She is the bassist of Roselia.",
       "image": "https://i.bandori.party/u/c/art/591Lisa-Imai-Pure-dgNQuq.png"
    },
    {  
       "date": 962550000000,
       "celebrant": "Ako Udagawa",
       "message": "Ako has chuunibyou tendencies, which Shirokane Rinko supposes results from her playing online games. She often wonders how she can be a \"cooler\" drummer, and sometimes feels inadequate compared to her other band mates. She admires Yukina, is the best friend of Rinko, and the little sister of Tomoe. She looks up to her sister, and started playing drums because she wanted to be as cool as her sister. She always is researching ways to be cooler, and started using weird words as a side-effect. She is the drummer of Roselia.",
       "image": "https://i.bandori.party/u/c/art/595Ako-Udagawa-Power-hczcZj.png"
    },
    {  
       "date": 971708400000,
       "celebrant": "Rinko Shirokane",
       "message": "Rinko is very shy and quiet, and at first is scared of the idea of performing in a live concert. She has an easily withdrawn and pessimistic personality, but is also the type to go to extremes for things she has decided on. Her hobbies are reading and playing online games, the latter through which she met her best friend, Udagawa Ako. She also enjoys crossword puzzles. She plays the keyboard for Roselia.",
       "image": "https://i.bandori.party/u/c/art/599Rinko-Shirokane-Cool-DQEQWd.png"
    }
];