module.exports = {
    name: "bandoriNewBirthday",
    time: "00 00 00 * * *",
    timezone: "Asia/Tokyo",
    task: (Kokoro) => {
        var data = require("../data.json");
        var birthday = birthdays.filter(item => isToday(item.date))[0];
        if (!birthday) return;
        for (var val in data) {
            if (data.hasOwnProperty(val)) {
                if (data[val].bandori_birthdayChannel) {
                    Kokoro.guilds.find("id", val)
                        .channels.find("id", data[val].bandori_birthdayChannel)
                        .send(birthday.message,
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
       "message": "Today is July 14, meaning today is Kasumi's birthday!\n\nShe is highly active and always positive girl. Since she entered high school, she's been searching for something sparkling that could make her heart flutter. Along the way, she encountered a girl with a bright red star-shaped guitar, and since then, it's become her dream to form a girl band. She has a younger sister in her family of 4, but it's not exactly clear who acts like the elder.",
       "image": "https://i.bandori.party/u/c/art/503Kasumi-Toyama-Happy-2RRAER.png"
    },
    {  
       "date": 975855600000,
       "message": "Today is December 4, meaning today is Tae's birthday!\n\nShe started playing the guitar in elementary school, and is very skilled at it. As a huge lover of music, she started working part-time at a live house upon entering high school. Her favorite item is her blue guitar that she bought using money that she saved. A natural airhead who lives at her own pace, she sometimes surprises the people around her with her unexpected moves. She lives with her parents and 20 rabbits.",
       "image": "https://i.bandori.party/u/c/art/507Tae-Hanazono-Pure-iePZKC.png"
    },
    {  
       "date": 953737200000,
       "message":"Today is March 23, meaning today is Rimi's birthday!\n\nDuring their high school entrance ceremony, she heard Kasumi's intro that was filled with boundless optimism, and this sparked her interest in Kasumi. Even though she wants to change her cowardly and shy personality, she has been unable to do anything about it. The pink bass that she uses is a hand-me-down from her elder sister Yuri, who is 2 years older than her and studies at the same high school. She is a huge fan of Yamabuki Bakery, and especially loves their chocolate cornet.",
       "image":"https://i.bandori.party/u/c/art/511Rimi-Ushigome-Cool-F3HxqH.png"
    },
    {  
       "date": 958662000000,
       "message": "Today is May 19, meaning today is Saaya's birthday!\n\nShe became good friends with her classmate Kasumi during the high school entrance ceremony, and since then they often eat their bentos together. A kind person who cares deeply about her friends, she often lends an ear to Kasumi. She is also a filial girl, helping out at her family's bakery, Yamabuki Bakery, even during the school term. She has a younger brother and sister. She apparently used to play in a girls' band when she was still in middle school, but now...",
       "image": "https://i.bandori.party/u/c/art/515Saaya-Yamabuki-Power-6qbcou.png"
    },
    {  
       "date": 972572400000,
       "message": "Today is October 27, meaning today is Arisa's birthday!\n\nHer family runs a pawnshop called \"Ryuuseidou\". Being in indoor person, her hobbies include tending for bonsai plants and internet surfing. Even though she's basically a shut-in, she still manages to achieve excellent results in school. Because her sharp tongue, she often gets into arguments with others, especially Kasumi, but it's usually because she is unable to be honest with herself. She started learning the piano when she was young, but gave up on it halfway.",
       "image": "https://i.bandori.party/u/c/art/519Arisa-Ichigaya-Happy-2szb4D.png"
    },
    {  
       "date": 955292400000,
       "message": "Today is April 10, meaning today is Ran's birthday!\n\nRan is only child of the masters of a flower arrangement school that goes back over 100 years. She's strong-willed and hates to lose, but she also has a side of her that hates being alone. She's the type of person to treasure her childhood friends and family more than anyone else. She has no particular interests.",
       "image": "https://i.bandori.party/u/c/art/523Ran-Mitake-Power-ZPchJv.png"
    },
    {  
       "date": 967906800000,
       "message": "Today is September 3, meaning today is Moca's birthday!\n\nMoca doesn't really have anything that she's super into, and is apathetic towards things that don't interest her, but she's the type who will get really worked up about the people she finds important. She likes to keep doing one thing without quitting, and playing her instrument is one of those things. She enjoys collecting point cards and sleeping.",
       "image": "https://i.bandori.party/u/c/art/527Moca-Aoba-Happy-dkHY2l.png"
    },
    {  
       "date": 972226800000,
       "message": "Today is October 23, meaning today is Himari's birthday!\n\nHimari is cheerful, good-natured, and is the band coordinator. She struggles to read the mood of a situation, which means she sometimes does things that have no effect. She's weak to tear-jerkers and sentimental episodes, and is easily moved to tears. She enjoys comparing the different sweets she buys from convenience stores.",
       "image": "https://i.bandori.party/u/c/art/531Himari-Uehara-Pure-eeixHa.png"
    },
    {  
       "date": 955724400000,
       "message": "Today is April 15, meaning today is Tomoe's birthday!\n\nTomoe is a pretty chill person who never says anything bad about other people or holds grudges against them. She also keeps the band from falling apart. She's friends with the adults who work in the shopping district, and often attends her hometown's festivals to play the taiko drum. She is interested in fashion and taiko drumming. Her younger sister is Udagawa Ako.",
       "image": "https://i.bandori.party/u/c/art/535Tomoe-Udagawa-Cool-An4aHD.png"
    },
    {  
       "date": 947170800000,
       "message": "Today is January 7, meaning today is Tsugumi's birthday!\n\nTsugumi is the most normal girl in the band. However, it's because she's so \"normal\" that she's such a hardworking and optimistic person who rarely gets discouraged. Her optimism really buoys the other members' spirits. She likes collecting bath powder.",
       "image": "https://i.bandori.party/u/c/art/539Tsugumi-Hazawa-Power-L00oAL.png"
    },
    {  
       "date": 965660400000,
       "message": "Today is August 8, meaning today is Kokoro's birthday!\n\nKokoro loves watching people smile, and her goal in life is to make the world smile. Despite her appearance, she is the only daughter of an extremely wealthy family. Her hobby is looking for fun things to do. Whenever she finds something that makes her feel \"I want to do this!\", she will do whatever it takes to make it come true. She's very curious, and her eyes are always dazzling.",
       "image": "https://i.bandori.party/u/c/art/728Kokoro-Tsurumaki-Happy-a0GhSG.png"
    },
    {  
       "date": 951663600000,
       "message": "Today is February 28, meaning today is Kaoru's birthday!\n\nKaoru is a celebrity at her school and belongs to the theater department there. She is very popular with ladies, who she dubs her \"little kittens\". In particular, Uehara Himari and Rimi Ushigome have a tendency of blushing furiously in her presence. She likes to read philosophical books and poetry, but doesn't really understand it. Outside of the band, she is also friends with Shirasagi Chisato.",
       "image": "https://i.bandori.party/u/c/art/547Kaoru-Seta-Cool-J2UwgQ.png"
    },
    {  
       "date": 964882800000,
       "message": "Today is July 30, meaning today is Hagumi's birthday!\n\nHagumi is always bright, active, but sensitive with a pure heart. She sometimes helps out at her parents' butcher shop, which is famous for their croquettes. Her favourite activity is running marathons and she's the captain and ace of the local softball team. She's in the same class as Toyama Kasumi.",
       "image": "https://i.bandori.party/u/c/art/551Hagumi-Kitazawa-Happy-vYyX7F.png"
    },
    {  
       "date": 957970800000,
       "message": "Today is May 11, meaning today is Kanon's birthday!\n\nKanon is very clumsy, quick to tears, and has a bad sense of direction. She's a bit of a pushover and very shy. Since she's a pushover, it's easy for her to get involved in others' affairs. She likes sweets and cute things, and is a bit reserved. She enjoys seeing jellyfish and going to cafes.",
       "image": "https://i.bandori.party/u/c/art/555Kanon-Matsubara-Pure-QXof10.png"
    },
    {  
       "date": 970326000000,
       "message": "Today is October 1, meaning today is Michelle, also known as Misaki's birthday!\n\nKnown to her band mates as the pink bear Michelle, Misaki is a reluctant member of Hello, Happy World! Misaki began wearing the bear costume at her part-time job and she was roped into joining the band by Tsurumaki Kokoro.",
       "image": "https://i.bandori.party/u/c/art/559Michelle-Happy-vr9GIq.png"
    },
    {  
       "date": 977842800000,
       "message": "Today is December 27, meaning today is Aya's birthday!\n\nAya admires idols and entered the entertainment industry as a probationary idol in the hopes of becoming one; however, she is easily nervous and cries easily when things go wrong and she's overwhelmed by her emotions. She has stage fright and so she has weak improvisation, so she has yet to achieve a breakthrough. After three years, she finally gets her chance to become an idol by becoming a part of Pastel*Palettes.",
       "image": "https://i.bandori.party/u/c/art/563Aya-Maruyama-Pure-MBGuks.png"
    },
    {  
       "date": 953478000000,
       "message": "Today is March 20, meaning today is Hina's birthday!\n\nA bright and quick-witted genius of a girl, she's capable of doing something after she's seen it once. She has a happy and refreshing personality, but she can also be insensitive and isn't good at sensing the mood. She has a habit of describing things with unusual ideophones. She has a hobby of making perfumes. She's the younger twin sister of Hikawa Sayo.",
       "image": "https://i.bandori.party/u/c/art/567Hina-Hikawa-Power-c0ONW0.png"
    },
    {  
       "date": 954946800000,
       "message": "Today is April 6, meaning today is Chisato's birthday!\n\nA young actress who has been active in the field since her roles as a child actress. She is polite and very responsible. Prior to joining Pastel Palettes, she was a child actress and did not know how to play the bass. She cherishes friends whom she can hang out with without needing to hold back. Her hobbies include shopping and having tea at cafes. Outside of the band, she is also friends with Matsubara Kanon and Seta Kaoru.",
       "image": "https://i.bandori.party/u/c/art/571Chisato-Shirasagi-Cool-zDUkRH.png"
    },
    {  
       "date": 973177200000,
       "message": "Today is November 3, meaning today is Maya's birthday!\n\nAn equipment geek, Maya is happiest when she's surrounded by instrument equipment. When you talk about instrument equipment, she becomes talkative. Prior to joining the band, she was a studio musician. She wears glasses, which she removes when performing.",
       "image": "https://i.bandori.party/u/c/art/575Maya-Yamato-Pure-e2ZVcw.png"
    },
    {  
       "date": 962031600000,
       "message": "Today is June 27, meaning today is Eve's birthday!\n\nEve has an honest and friendly personality to everyone. She is in the same class as Kasumi Toyama and many other members of Poppin' Party. Before joining Pastel*Palettes, she was a model at the same agency. She is notably taller than the other members of her band. Eve is from Finland and finds Japanese culture exciting, often citing bushido, the code of Japanese warriors. She strongly admires Bushido. Her father is Japanese, and her mother, Finnish.",
       "image": "https://i.bandori.party/u/c/art/579Eve-Wakamiya-Happy-4irMsB.png"
    },
    {  
       "date": 972486000000,
       "message": "Today is October 26, meaning today is Yukina's birthday!\n\nYukina is a powerful vocalist, sparking the admiration of the other Roselia members. She has a strong-willed and stubborn personality and doesn't smile much in public. She pursues her beliefs with reckless devotion, causing her to be blind to everything else around her. She is best friends with Imai Lisa and considers Mitake Ran somewhat of a rival. She has a weak spot for cats.",
       "image": "https://i.bandori.party/u/c/art/583Yukina-Minato-Happy-DYUUqX.png"
    },
    {  
       "date": 953478000000,
       "message": "Today is March 20, meaning today is Sayo's birthday!\n\nA serious and fussy girl, Sayo can come off as somewhat cold in nature. She would never cut corners or be shoddy about things; because of that, she lives her life too seriously for her own good. She likes fluffy animals and practices archery. She's the older twin sister of Hikawa Hina. She has a complex and feels inferior to her twin sister.",
       "image": "https://i.bandori.party/u/c/art/587Sayo-Hikawa-Cool-Z9JRZx.png"
    },
    {  
       "date": 967129200000,
       "message": "Today is August 25, meaning today is Lisa's birthday!\n\nWith her flamboyant looks, Lisa is easily misunderstood as frivolous, but is actually a compassionate and faithful person. She has a lot of friends due to her stylishness and bright personality. Lisa follows gyaru fashion, but keeps her interest in knitting a secret, since it does not match her image. She is a proficient bassist, wowing the other Roselia members in her audition, and is good at baking cookies. She is best friends with Minato Yukina. Outside of the band, she is also friends with Aoba Moca.",
       "image": "https://i.bandori.party/u/c/art/591Lisa-Imai-Pure-dgNQuq.png"
    },
    {  
       "date": 962550000000,
       "message": "Today is July 3, meaning today is Ako's birthday!\n\nAko has chuunibyou tendencies, which Shirokane Rinko supposes results from her playing online games. She often wonders how she can be a \"cooler\" drummer, and sometimes feels inadequate compared to her other band mates. She admires Minato Yukina, is the best friend of Shirokane Rinko, and the little sister of Udagawa Tomoe. She looks up to her sister, and started playing drums because she wanted to be as cool as her sister. She always is researching ways to be cooler, and started using weird words as a side-effect.",
       "image": "https://i.bandori.party/u/c/art/595Ako-Udagawa-Power-hczcZj.png"
    },
    {  
       "date": 971708400000,
       "message": "Today is October 17, meaning today is Rinko's birthday!\n\nRinko is very shy and quiet, and at first is scared of the idea of performing in a live concert. She has an easily withdrawn and pessimistic personality, but is also the type to go to extremes for things she has decided on. Her hobbies are reading and playing online games, the latter through which she met her best friend, Udagawa Ako. She also enjoys crossword puzzles.",
       "image": "https://i.bandori.party/u/c/art/599Rinko-Shirokane-Cool-DQEQWd.png"
    }
];