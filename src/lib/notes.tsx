/* eslint-disable react/no-unescaped-entities */
import React from 'react';

export type LanguageContent = {
    title: string;
    paragraphs: React.ReactNode[];
    signature: {
        closing: string;
        name: string;
    };
};

export type Note = {
    id: string;
    date: string;
    content: Record<'EN' | 'ID', LanguageContent>;
};

export const notes: Note[] = [
    {
        id: '1',
        date: 'February 2, 2026',
        content: {
            EN: {
                title: "It All Started Here",
                paragraphs: [
                    <React.Fragment key="p0_0">It all started here. There are countless thoughts constantly spinning in my head, an endless stream of unanswered questions that leaves me feeling entirely overwhelmed. From the unresolved matters of our shared accounts to every little thing that has suddenly changed. It has all piled up, and to be completely honest, the weight of it is suffocating.</React.Fragment>,
                    <React.Fragment key="p0_1">Ever since that 21st, I've found myself desperate to try every possible way, clinging to the fading hope that we could somehow go back to how things used to be. To a time when you were just a message away. But the reality is that my days are now spent in tears. Waking up with a heavy chest and crying silently has become my most painful new routine.</React.Fragment>,
                    <React.Fragment key="p0_2">I do not know if you realize this, but with every passing minute, you cross my mind. It breaks me to hold back my tears, forced to accept the reality that you are no longer permitted in my life, when I still love you this deeply. Sometimes I wonder, if we could just set aside our egos. If you ever felt that it shouldn't have ended this way, and if the people around us felt the same, wouldn't we try every possible way to return if the love was truly real?</React.Fragment>,
                    <React.Fragment key="p0_3">What aches the most is the cold aftermath of our separation. It feels as though we've been reduced to a stark "who are you, and who am I." Two people who once knew the deepest parts of each other, turned into complete strangers overnight. That drastic shift leaves me overthinking and crying, and whenever I accidentally see you online or hear the echo of your voice, my chest abruptly tightens.</React.Fragment>,
                    <React.Fragment key="p0_4">It all fell apart so suddenly. We went from being incredibly close to you abruptly walking away with reasons that felt so illogical to me, such as the fear of missing out, wanting to focus, and the demands of the semester. Please don't misunderstand, I am deeply grateful and happy to have known you. It's just that I never imagined unilateral abandonment would be your way of solving our problems.</React.Fragment>,
                    <React.Fragment key="p0_5">We did talk once or twice afterward, but it only hurt more when I realized I was the only one foolishly hoping we could fix things. Your absolute decision rendered me utterly powerless. So, I suppose I shouldn't force anything anymore. Just as you said, our paths no longer align. I will gracefully let the current take it from here.</React.Fragment>,
                    <React.Fragment key="p0_6">I don't even know what else to write. My mind is an absolute mess. My heart feels incredibly heavy every single day, every hour, and every minute. Just the mere thought of your existence or the memories of your voice is enough to break me down again. Thank you. That is truly all I wanted to say.</React.Fragment>
                ],
                signature: { closing: "Quietly,", name: "R A F L I" }
            },
            ID: {
                title: "Semua Ini Dimulai Dari Sini",
                paragraphs: [
                    <React.Fragment key="p0_7">Semua ini dimulai dari sini. Ada banyak sekali hal yang terus berputar di kepalaku, rentetan pertanyaan tanpa jawaban yang tak henti-hentinya membuatku merasa kewalahan. Mulai dari urusan akun-akun kita hingga segala hal kecil yang kini terasa berbeda. Semua itu menumpuk menjadi satu, dan jujur saja, itu membuatku sangat tertekan.</React.Fragment>,
                    <React.Fragment key="p0_8">Sejak tanggal 21 itu, aku selalu mencoba memikirkan segala cara, melakukan apa pun yang aku bisa dengan harapan kita bisa kembali seperti dulu. Saat di mana kamu hanya berjarak satu pesan dariku. Namun nyatanya, hari-hariku kini hanya dihabiskan dalam tangisan. Terbangun dengan dada yang sesak dan air mata yang jatuh begitu saja seolah menjadi rutinitas baruku yang paling menyakitkan.</React.Fragment>,
                    <React.Fragment key="p0_9">Entah kamu menyadarinya atau tidak, setiap menit kamu selalu melintas di pikiranku. Rasanya aku sudah tidak sanggup lagi jika harus terus meratapi kenyataan bahwa kamu tidak boleh lagi ada di hidupku. Terkadang aku berpikir, jika saja kita mau menyingkirkan ego. Jikapun kamu merasa ini tidak seharusnya terjadi, dan orang-orang di sekitarmu juga merasa begitu, bukankah saat kita benar-benar menyayangi seseorang, kita akan mencoba segala cara untuk kembali?</React.Fragment>,
                    <React.Fragment key="p0_10">Yang paling menyiksa dari semua ini adalah kesan yang tertinggal setelah kita berpisah. Kesannya benar-benar seolah "kamu siapa, dan aku siapa". Dua orang yang dulunya tahu segalanya tentang satu sama lain, tiba-tiba menjadi dua sosok asing yang berjarak. Perubahan drastis itu memaksaku untuk berpikir terlalu jauh, membuatku menangis, dan setiap kali tanpa sengaja aku melihatmu online atau teringat suaramu, dadaku langsung menolak untuk bernapas dengan tenang.</React.Fragment>,
                    <React.Fragment key="p0_11">Semuanya terjadi begitu tiba-tiba. Dari kita yang begitu dekat, hingga keputusan sepihakmu untuk mengakhiri hubungan dengan alasan yang menurutku kurang masuk akal, seperti ketakutanmu tertinggal momen, keinginan untuk fokus, atau tuntutan semester. Jangan salah paham, aku sangat bersyukur dan bahagia bisa mengenalmu. Hanya saja, aku tidak pernah mengira bahwa perpisahan dan keputusan sepihak adalah caramu menyelesaikan masalah kita.</React.Fragment>,
                    <React.Fragment key="p0_12">Kita memang sempat berbicara satu atau dua kali setelahnya, tapi luka itu semakin terasa saat aku menyadari bahwa hanya aku yang sungguh-sungguh berharap kita bisa memperbaiki keadaan. Keputusan mutlak darimu membuatku sama sekali tidak berdaya. Jadi, aku rasa sudah cukup bagi kita untuk memaksakan semuanya. Seperti yang pernah kamu katakan, tujuan kita sudah tidak lagi sejalan. Maka biarkanlah semuanya berhenti di sini.</React.Fragment>,
                    <React.Fragment key="p0_13">Aku tidak tahu harus menulis apa lagi. Perasaanku sangat kacau. Hatiku terasa begitu sesak setiap hari, setiap jam, bahkan setiap menit. Hanya dengan mengingat eksistensimu atau kenangan suara-suaramu saja sudah cukup untuk melemahkanku lagi. Terima kasih. Hanya itu yang benar-benar ingin aku sampaikan padamu.</React.Fragment>
                ],
                signature: { closing: "Dalam sepi,", name: "R A F L I" }
            }
        }
    },
    {
        id: '2',
        date: 'February 4, 2026',
        content: {
            EN: {
                title: "Why This Website Exists",
                paragraphs: [
                    <React.Fragment key="p4_0">I decided to build this website for no grand reason. I only needed a place to pour out everything inside my head that kept spinning and made my chest feel tight. Since the twenty first, everything has felt chaotic. Questions without answers kept following me. From our account matters to small things that suddenly felt unfamiliar. Honestly, it all put me under real pressure.</React.Fragment>,
                    <React.Fragment key="p4_1">Every day I kept looking for a way to return to how we used to be, when you were only one message away. But the reality was different. My days were spent crying. I often woke up with a heavy chest and tears falling without warning. That became my most painful routine. Your name crossed my mind every minute. I knew you should no longer be in my life, but accepting that truth was very hard.</React.Fragment>,
                    <React.Fragment key="p4_2">Sometimes I wondered, if we had set ego aside, maybe everything would have been different. When we truly care about someone, do we not try every possible way to return. But that was only my own hope. The hardest part was what remained after the breakup. It felt strange. We once knew everything, now we were two distant strangers. Every time I saw you online or remembered your voice, breathing calmly became difficult.</React.Fragment>,
                    <React.Fragment key="p4_3">Everything changed so suddenly. You chose to end our relationship with reasons that were difficult for me to accept. You said you wanted to focus, feared missing out, or had semester pressure. Please do not misunderstand me. I was grateful to know you, Cantika Intan Aulia. I simply never imagined that a one sided breakup would become your way to solve our problems.</React.Fragment>,
                    <React.Fragment key="p4_4">After we broke up, we talked once or twice. But the wound felt even more real when I realized I was the only one hoping we could repair things. Your final decision left me powerless. So I decided to stop forcing everything. Just as you said, our goals were no longer aligned. Let everything stop here.</React.Fragment>,
                    <React.Fragment key="p4_5">Now I want to be honest about what still lingers in me. On one side, I still care deeply for you. On the other side, I understand that you wanted that freedom. I still do not know whether we ended because of something truly major or because small issues were left to grow. I kept trying then. I called, sent food, and tried many ways to get closer again. In the end, I understood that your heart could not be forced.</React.Fragment>,
                    <React.Fragment key="p4_6">I am writing this not to make anyone hate you. Please, do not let anyone hate you after reading this. You are a good person. I am only trying to process my sadness and disappointment. I need validation for what I felt. If I was wrong, please correct me gently. I am not looking for harsh criticism. I only want to be heard.</React.Fragment>,
                    <React.Fragment key="p4_7">At first I thought this process would be short. It was not. Time moved very slowly, and this sadness stayed much longer than I expected. The longer it went, our chats felt colder and harder to read again. That is why I chose to write this as my way to let go. Let this writing be a witness that there was once someone who truly fought, before finally learning to release everything.</React.Fragment>
                ],
                signature: { closing: "Trying to let go,", name: "R A F L I" }
            },
            ID: {
                title: "Alasan Website Ini Dibuat",
                paragraphs: [
                    <React.Fragment key="p6_0">Aku memutuskan membuat website ini bukan karena hal besar. Aku hanya butuh tempat untuk menuangkan isi kepala yang terus berputar dan membuat dada terasa sesak. Sejak tanggal 21, semuanya terasa berantakan. Pertanyaan tanpa jawaban terus datang. Mulai dari urusan akun kita sampai hal kecil yang tiba-tiba terasa asing. Jujur, semua itu benar-benar membuatku tertekan.</React.Fragment>,
                    <React.Fragment key="p6_1">Setiap hari aku mencari cara agar kita bisa kembali seperti dulu, saat kamu hanya berjarak satu pesan dariku. Namun kenyataannya berbeda. Hari-hariku habis untuk menangis. Aku sering terbangun dengan dada yang berat, lalu air mata jatuh begitu saja. Itu jadi rutinitas baru yang paling menyakitkan. Namamu selalu melintas di kepalaku setiap menit. Aku tahu seharusnya kamu tidak lagi ada di hidupku, tapi menerima kenyataan itu sangat sulit.</React.Fragment>,
                    <React.Fragment key="p6_2">Kadang aku berpikir, andai kita mau menurunkan ego, mungkin semuanya bisa berbeda. Saat kita benar-benar menyayangi seseorang, bukankah kita akan mencoba banyak cara untuk kembali. Namun itu hanya harapanku sendiri. Yang paling menyiksa adalah kesan setelah kita berpisah. Rasanya aneh. Kita yang dulu saling tahu segalanya, sekarang jadi dua orang asing yang berjarak. Setiap kali aku tidak sengaja melihatmu online atau teringat suaramu, rasanya sulit bernapas dengan tenang.</React.Fragment>,
                    <React.Fragment key="p6_3">Semuanya terjadi sangat tiba-tiba. Kamu memilih mengakhiri hubungan dengan alasan yang, jujur saja, sulit aku terima. Kamu bilang ingin fokus, takut ketinggalan momen, atau karena tuntutan semester. Jangan salah paham. Aku tetap bersyukur bisa mengenal kamu, Cantika Intan Aulia. Aku hanya tidak pernah menyangka bahwa perpisahan sepihak akan jadi cara menyelesaikan masalah kita.</React.Fragment>,
                    <React.Fragment key="p6_4">Setelah putus, kita memang sempat bicara satu dua kali. Tapi lukanya justru makin nyata saat aku sadar cuma aku yang berharap keadaan bisa diperbaiki. Keputusan mutlak darimu membuatku tidak berdaya. Jadi, aku memutuskan berhenti memaksakan semuanya. Seperti katamu, tujuan kita memang sudah tidak sejalan. Biarkan semuanya berhenti di sini.</React.Fragment>,
                    <React.Fragment key="p6_5">Sekarang aku ingin jujur tentang perasaan yang masih tersisa. Di satu sisi, aku sangat menyayangimu. Di sisi lain, aku tahu kamu menginginkan kebebasan itu. Aku tidak tahu apakah kita berakhir karena hal yang benar-benar besar atau karena masalah kecil yang dibiarkan membesar. Saat itu aku masih mencoba. Aku menelepon, mengirim makanan, dan melakukan berbagai cara untuk mendekat kembali. Pada akhirnya aku sadar, hati tidak bisa dipaksa.</React.Fragment>,
                    <React.Fragment key="p6_6">Aku menulis ini bukan untuk membuat siapa pun membencimu. Tolong, jangan ada yang membenci kamu setelah membaca ini. Kamu orang yang baik. Aku hanya sedang memproses rasa sedih dan kecewa. Aku butuh validasi atas perasaanku. Kalau aku salah, tolong koreksi dengan cara yang baik. Aku sedang tidak ingin menerima kritik yang tajam. Aku hanya ingin didengar.</React.Fragment>,
                    <React.Fragment key="p6_7">Awalnya aku pikir proses ini akan sebentar. Ternyata tidak. Waktu berjalan sangat lambat, dan rasa sedih ini tinggal jauh lebih lama dari perkiraanku. Semakin lama, chat kita terasa makin asing, seperti teks dingin yang tidak enak dibaca kembali. Karena itu aku menulis ini sebagai caraku untuk merelakan. Biarkan tulisan ini jadi saksi bahwa pernah ada seseorang yang sungguh-sungguh berjuang, sebelum akhirnya belajar melepaskan semuanya.</React.Fragment>
                ],
                signature: { closing: "Sedang belajar merelakan,", name: "R A F L I" }
            }
        }
    },
    {
        id: '3',
        date: 'February 6, 2026',
        content: {
            EN: {
                title: "The Empty Passenger Seat",
                paragraphs: [
                    <React.Fragment key="p8">I drove past that café we used to frequent on my way to work today. I didn't mean to look, but my eyes drifted to the corner table we always claimed.</React.Fragment>,
                    <React.Fragment key="p9">The passenger seat next to me feels excessively large. I put my bag there, trying to fill the space, but it doesn't quite replace the warmth of your presence.</React.Fragment>
                ],
                signature: { closing: "Driving alone,", name: "R A F L I" }
            },
            ID: {
                title: "Kursi Penumpang yang Kosong",
                paragraphs: [
                    <React.Fragment key="p10">Aku melewati kafe yang dulu sering kita kunjungi saat perjalanan ke tempat kerja hari ini. Aku tidak bermaksud melihatnya, tapi mataku tertuju pada meja sudut yang selalu kita tempati.</React.Fragment>,
                    <React.Fragment key="p11">Kursi penumpang di sebelahku terasa sangat luas. Aku menaruh tasku di sana, mencoba mengisi ruang itu, tetapi tetap tak bisa menggantikan kehangatan kehadiranmu.</React.Fragment>
                ],
                signature: { closing: "Menyetir sendiri,", name: "R A F L I" }
            }
        }
    },
    {
        id: '4',
        date: 'February 7, 2026',
        content: {
            EN: {
                title: "A Song Playing",
                paragraphs: [
                    <React.Fragment key="p12">Shuffle decided to play exactly the wrong song today. The one we laughed about because neither of us knew the lyrics, but we sang it anyway.</React.Fragment>,
                    <React.Fragment key="p13">I let it play to the end. It felt like a small rebellion against the fact that we don't sing together anymore.</React.Fragment>
                ],
                signature: { closing: "Listening,", name: "R A F L I" }
            },
            ID: {
                title: "Sebuah Lagu Terdengar",
                paragraphs: [
                    <React.Fragment key="p14">Mode acak memutuskan untuk memutar lagu yang sangat salah hari ini. Lagu yang dulu kita tertawakan karena kita berdua tidak tahu liriknya, tapi kita tetap menyanyikannya.</React.Fragment>,
                    <React.Fragment key="p15">Aku membiarkannya diputar sampai habis. Rasanya seperti pemberontakan kecil terhadap kenyataan bahwa kita tidak lagi bernyanyi bersama.</React.Fragment>
                ],
                signature: { closing: "Mendengarkan,", name: "R A F L I" }
            }
        }
    },
    {
        id: '5',
        date: 'February 9, 2026',
        content: {
            EN: {
                title: "Raindrops",
                paragraphs: [
                    <React.Fragment key="p16">It rained heavily this afternoon. The kind of rain that makes you want to stay in bed and watch movies. We would have spent hours just listening to it hit the roof.</React.Fragment>,
                    <React.Fragment key="p17">Instead, I sat by the window, watching the drops race down the glass, wondering if it was raining where you are too.</React.Fragment>
                ],
                signature: { closing: "Watching the rain,", name: "R A F L I" }
            },
            ID: {
                title: "Rintik Hujan",
                paragraphs: [
                    <React.Fragment key="p18">Sore ini hujan deras. Jenis hujan yang membuatmu ingin diam di kasur dan menonton film. Kita pasti sudah menghabiskan waktu berjam-jam sekadar mendengarkannya jatuh di atap.</React.Fragment>,
                    <React.Fragment key="p19">Alih-alih, aku duduk di dekat jendela, melihat rintikan air berlomba turun di kaca, bertanya-tanya apakah di tempatmu juga sedang hujan.</React.Fragment>
                ],
                signature: { closing: "Melihat hujan,", name: "R A F L I" }
            }
        }
    },
    {
        id: '6',
        date: 'February 10, 2026',
        content: {
            EN: {
                title: "Old Messages",
                paragraphs: [
                    <React.Fragment key="p20">I made the mistake of scrolling up. A moment of weakness that cost me a good hour of my evening.</React.Fragment>,
                    <React.Fragment key="p21">Reading our old conversations is like looking at a different version of myself—one that was constantly smiling at a screen. I closed the app before I could fall completely into the trap.</React.Fragment>
                ],
                signature: { closing: "Looking back,", name: "R A F L I" }
            },
            ID: {
                title: "Pesan Lama",
                paragraphs: [
                    <React.Fragment key="p22">Aku melakukan kesalahan dengan men-scroll ke atas. Sebuah momen kelemahan yang menghabiskan waktu berjam-jam di malam hariku.</React.Fragment>,
                    <React.Fragment key="p23">Membaca percakapan lama kita itu seperti melihat versi diriku yang berbeda—seseorang yang terus-menerus tersenyum pada layar. Aku segera menutup aplikasi itu sebelum aku benar-benar jatuh ke dalam perangkap kenangan.</React.Fragment>
                ],
                signature: { closing: "Menengok ke belakang,", name: "R A F L I" }
            }
        }
    },
    {
        id: '7',
        date: 'February 11, 2026',
        content: {
            EN: {
                title: "The Work Distraction",
                paragraphs: [
                    <React.Fragment key="p24">I’ve thrown myself into work lately. Lines of code, obscure bugs, anything that requires absolute focus.</React.Fragment>,
                    <React.Fragment key="p25">It works for a few hours. But the moment my mind rests, there you are again, waiting quietly in the corner of my thoughts.</React.Fragment>
                ],
                signature: { closing: "Keeping busy,", name: "R A F L I" }
            },
            ID: {
                title: "Distraksi Pekerjaan",
                paragraphs: [
                    <React.Fragment key="p26">Aku menenggelamkan diri dalam pekerjaan belakangan ini. Barisan kode, bug yang tidak jelas, apapun yang membutuhkan fokus penuh.</React.Fragment>,
                    <React.Fragment key="p27">Itu berhasil selama beberapa jam. Tapi saat pikiranku istirahat, kamu ada di sana lagi, diam-diam menungguku di sudut lamunan.</React.Fragment>
                ],
                signature: { closing: "Menyibukkan diri,", name: "R A F L I" }
            }
        }
    },
    {
        id: '8',
        date: 'February 13, 2026',
        content: {
            EN: {
                title: "A Shared Joke",
                paragraphs: [
                    <React.Fragment key="p28">Someone made a joke today that we used to laugh about. I almost turned around to catch your eye, forgetting for a brief second that you weren't there.</React.Fragment>,
                    <React.Fragment key="p29">I smiled anyway, but the warmth faded quickly, leaving behind just the stark realization of the distance between us.</React.Fragment>
                ],
                signature: { closing: "A half-smile,", name: "R A F L I" }
            },
            ID: {
                title: "Candaan Bersama",
                paragraphs: [
                    <React.Fragment key="p30">Seseorang membuat candaan hari ini yang dulu sering kita tertawakan bersama. Aku nyaris menoleh untuk menatap matamu, lupa sejenak bahwa kamu tak ada di sana.</React.Fragment>,
                    <React.Fragment key="p31">Aku tetap tersenyum, tetapi kehangatan itu cepat pudar, hanya menyisakan kesadaran tajam tentang jarak di antara kita.</React.Fragment>
                ],
                signature: { closing: "Senyum tertahan,", name: "R A F L I" }
            }
        }
    },
    {
        id: '9',
        date: 'February 15, 2026',
        content: {
            EN: {
                title: "The Familiar Scent",
                paragraphs: [
                    <React.Fragment key="p32">A stranger walked past me with the same perfume you used to wear. It was overwhelming how quickly a smell could drag my mind back in time.</React.Fragment>,
                    <React.Fragment key="p33">I paused for a second, catching my breath in the middle of a crowded street, realizing how strongly memory is tied to the senses.</React.Fragment>
                ],
                signature: { closing: "Breathing in,", name: "R A F L I" }
            },
            ID: {
                title: "Wangi yang Dikenal",
                paragraphs: [
                    <React.Fragment key="p34">Seorang asing berjalan melewatiku dengan parfum yang sama dengan yang sering kamu pakai. Sangat mengejutkan betapa cepatnya sebuah aroma bisa menyeret pikiranku kembali ke masa lalu.</React.Fragment>,
                    <React.Fragment key="p35">Aku berhenti sejenak, menahan napas di tengah jalan yang ramai, menyadari betapa kuatnya ingatan terikat pada indera.</React.Fragment>
                ],
                signature: { closing: "Menarik napas,", name: "R A F L I" }
            }
        }
    },
    {
        id: '10',
        date: 'February 16, 2026',
        content: {
            EN: {
                title: "Late Nights",
                paragraphs: [
                    <React.Fragment key="p36">2:00 AM used to be our hour. The time when we were too tired to make sense, but too awake to end the call.</React.Fragment>,
                    <React.Fragment key="p37">Now, 2:00 AM is just late. A time when I should be asleep, but instead, I'm watching the ceiling, accompanied only by the hum of my computer.</React.Fragment>
                ],
                signature: { closing: "Still awake,", name: "R A F L I" }
            },
            ID: {
                title: "Malam Larut",
                paragraphs: [
                    <React.Fragment key="p38">Jam 2 pagi dulunya adalah waktu kita. Waktu di mana kita terlalu lelah untuk berpikir jernih, tetapi terlalu sadar untuk mematikan telepon.</React.Fragment>,
                    <React.Fragment key="p39">Sekarang, jam 2 pagi cuma berarti sudah sangat larut. Waktu di mana aku seharusnya sudah tidur, tapi yang ada aku menatap langit-langit, hanya ditemani dengung komputerku.</React.Fragment>
                ],
                signature: { closing: "Masih terjaga,", name: "R A F L I" }
            }
        }
    },
    {
        id: '11',
        date: 'February 18, 2026',
        content: {
            EN: {
                title: "Deleting a Photo",
                paragraphs: [
                    <React.Fragment key="p40">I had to clear some storage on my phone today. I stumbled upon a picture of us that I had forgotten about.</React.Fragment>,
                    <React.Fragment key="p41">My thumb hovered over the delete button for a solid minute, but I swiped past it instead. Letting go of digital footprints feels suspiciously harder than it should.</React.Fragment>
                ],
                signature: { closing: "Keeping the picture,", name: "R A F L I" }
            },
            ID: {
                title: "Menghapus Foto",
                paragraphs: [
                    <React.Fragment key="p42">Aku harus membersihkan penyimpanan ponselku hari ini. Aku tak sengaja menemukan foto kita yang sempat terlupakan.</React.Fragment>,
                    <React.Fragment key="p43">Jempolku melayang di atas tombol hapus selama semenit penuh, tapi akhirnya aku menggesernya begitu saja. Melepaskan jejak digital rasanya jauh lebih sulit dari yang seharusnya.</React.Fragment>
                ],
                signature: { closing: "Menyimpan gambarnya,", name: "R A F L I" }
            }
        }
    },
    {
        id: '12',
        date: 'February 20, 2026',
        content: {
            EN: {
                title: "The Thought of Moving On",
                paragraphs: [
                    <React.Fragment key="p44">They say time heals, but no one really talks about how moving on feels like a betrayal to what once felt incredibly real.</React.Fragment>,
                    <React.Fragment key="p45">I find myself holding onto the sadness because it’s the last remaining tie I have to you. Without it, you truly become just a memory.</React.Fragment>
                ],
                signature: { closing: "Holding on,", name: "R A F L I" }
            },
            ID: {
                title: "Pikiran untuk Merelakan",
                paragraphs: [
                    <React.Fragment key="p46">Orang bilang waktu bakal menyembuhkan, tapi tidak ada yang benar-benar membahas bagaimana merelakan rasanya seperti mengkhianati apa yang dulu terasa sangat nyata.</React.Fragment>,
                    <React.Fragment key="p47">Aku menyadari bahwa aku mempertahankan rasa sedih ini karena inilah satu-satunya ikatan yang tersisa denganmu. Tanpanya, kamu benar-benar hanya menjadi sekadar kenangan.</React.Fragment>
                ],
                signature: { closing: "Bertahan,", name: "R A F L I" }
            }
        }
    },
    {
        id: '13',
        date: 'February 22, 2026',
        content: {
            EN: {
                title: "A Dream",
                paragraphs: [
                    <React.Fragment key="p48">I dreamt about you last night. It wasn't a profound dream—we were just walking down a street, talking about something trivial.</React.Fragment>,
                    <React.Fragment key="p49">Waking up from that felt cruel. For a brief moment of consciousness, everything was fine, until reality hit and the room felt empty again.</React.Fragment>
                ],
                signature: { closing: "Waking up again,", name: "R A F L I" }
            },
            ID: {
                title: "Sebuah Mimpi",
                paragraphs: [
                    <React.Fragment key="p50">Aku memimpikanmu tadi malam. Bukan mimpi yang luar biasa—kita cuma sedang berjalan menyusuri jalan, membicarakan hal-hal sepele.</React.Fragment>,
                    <React.Fragment key="p51">Terbangun dari sana rasanya sangat kejam. Selama sepersekian detik setelah sadar, rasanya semua baik-baik saja, sampai realita menghantam dan ruangan kembali terasa kosong.</React.Fragment>
                ],
                signature: { closing: "Terbangun lagi,", name: "R A F L I" }
            }
        }
    },
    {
        id: '14',
        date: 'February 24, 2026',
        content: {
            EN: {
                title: "Checking In",
                paragraphs: [
                    <React.Fragment key="p52">I almost texted you today to ask how your presentation went. I typed the message out, deleted it, typed it again, and locked my phone.</React.Fragment>,
                    <React.Fragment key="p53">It’s difficult unlearning the instinct to share every detail of my life with you.</React.Fragment>
                ],
                signature: { closing: "Unsent,", name: "R A F L I" }
            },
            ID: {
                title: "Ingin Bertanya",
                paragraphs: [
                    <React.Fragment key="p54">Aku hampir mengirim pesan padamu hari ini untuk menanyakan kelancaran presentasimu. Aku mengetik pesannya, menghapusnya, mengetik lagi, lalu mengunci layarku.</React.Fragment>,
                    <React.Fragment key="p55">Sangat sulit menghilangkan insting untuk membagikan setiap detail hidupku padamu.</React.Fragment>
                ],
                signature: { closing: "Tak terkirim,", name: "R A F L I" }
            }
        }
    },
    {
        id: '15',
        date: 'February 25, 2026',
        content: {
            EN: {
                title: "The Ghost of the Routine",
                paragraphs: [
                    <React.Fragment key="p56">Everything I do seems to carry your imaginary silhouette. The shows we watched, the places we ate, the memes I save on my phone with no one to send them to.</React.Fragment>,
                    <React.Fragment key="p57">I am navigating through the ghost of our routine, hoping it fades away quietly soon.</React.Fragment>
                ],
                signature: { closing: "Fading routines,", name: "R A F L I" }
            },
            ID: {
                title: "Bayangan Rutinitas",
                paragraphs: [
                    <React.Fragment key="p58">Segala hal yang kulakukan rasanya selalu ada siluet imaginasimu. Acara yang kita tonton, tempat kita makan, meme yang kusimpan di hape tanpa tahu mau dikirim ke mana.</React.Fragment>,
                    <React.Fragment key="p59">Aku menelusuri bayangan sisa-sisa rutinitas kita, berharap itu lekas memudar dalam sunyi.</React.Fragment>
                ],
                signature: { closing: "Rutinitas yang pudar,", name: "R A F L I" }
            }
        }
    },
    {
        id: '16',
        date: 'February 26, 2026',
        content: {
            EN: {
                title: "The Heavy Realization",
                paragraphs: [
                    <React.Fragment key="p60">There was no big dramatic realization today, just a quiet, heavy truth settling into my chest: you are building a life that doesn't include me anymore.</React.Fragment>,
                    <React.Fragment key="p61">It stung for a bit, but then, surprisingly, it felt peaceful. Like accepting the weather. You can't change it, you just adapt to it.</React.Fragment>
                ],
                signature: { closing: "Accepting the weather,", name: "R A F L I" }
            },
            ID: {
                title: "Kesadaran yang Berat",
                paragraphs: [
                    <React.Fragment key="p62">Tidak ada kesadaran dramatis hari ini, cuma sebuah kenyataan hening dan berat yang hinggap di dadaku: kamu sedang menyusun hidup yang tak lagi melibatkan aku.</React.Fragment>,
                    <React.Fragment key="p63">Itu sedikit menyengat, tapi setelahnya, anehnya terasa damai. Seperti menerima takdir cuaca. Kamu tidak bisa mengubahnya, kamu hanya harus beradaptasi.</React.Fragment>
                ],
                signature: { closing: "Menerima cuaca,", name: "R A F L I" }
            }
        }
    },
    {
        id: '17',
        date: 'February 27, 2026',
        content: {
            EN: {
                title: "Finding an Old Item",
                paragraphs: [
                    <React.Fragment key="p64">Found that little keychain you bought me from your trip. It was tucked away in my winter coat pocket.</React.Fragment>,
                    <React.Fragment key="p65">I held it for a while, feeling the smooth edge, and then placed it gently in my drawer. No sadness today, just a fond memory of a warmer time.</React.Fragment>
                ],
                signature: { closing: "A piece of the past,", name: "R A F L I" }
            },
            ID: {
                title: "Menemukan Barang Lama",
                paragraphs: [
                    <React.Fragment key="p66">Aku menemukan gantungan kunci kecil yang kamu belikan saat liburanmu dulu. Terselip di dalam saku jaket musim dinginku.</React.Fragment>,
                    <React.Fragment key="p67">Aku memegangnya sebentar, merasakan pinggiran halusnya, lalu meletakkannya dengan pelan di laciku. Tidak ada kesedihan hari ini, hanya kenangan manis dari masa-masa yang lebih hangat.</React.Fragment>
                ],
                signature: { closing: "Sekeping masa lalu,", name: "R A F L I" }
            }
        }
    },
    {
        id: '18',
        date: 'February 28, 2026',
        content: {
            EN: {
                title: "A Glimpse of Peace",
                paragraphs: [
                    <React.Fragment key="p68">Today was the first day I didn't immediately think of you when I woke up. It took me until mid-afternoon to realize that.</React.Fragment>,
                    <React.Fragment key="p69">It feels like progress, though a part of me feels a twinge of guilt for forgetting, even just for half a day.</React.Fragment>
                ],
                signature: { closing: "Moving forward,", name: "R A F L I" }
            },
            ID: {
                title: "Sekilas Kedamaian",
                paragraphs: [
                    <React.Fragment key="p70">Hari ini adalah hari pertama aku tak langsung memikirkanmu saat bangun tidur. Butuh waktu sampai siang untuk aku menyadarinya.</React.Fragment>,
                    <React.Fragment key="p71">Rasanya ini seperti sebuah progres, walau sebagian diriku merasa sedikit bersalah karena sempat melupakan, meski hanya setengah hari.</React.Fragment>
                ],
                signature: { closing: "Melangkah maju,", name: "R A F L I" }
            }
        }
    },
    {
        id: '19',
        date: 'March 1, 2026',
        content: {
            EN: {
                title: "The Fading Anger",
                paragraphs: [
                    <React.Fragment key="p72">Any residual frustration I felt about how things ended has slowly dissipated into nothing. Anger requires energy, and frankly, I’m just tired.</React.Fragment>,
                    <React.Fragment key="p73">I don't blame you anymore. We were two complex people trying our best, and sometimes, the best just isn't enough to make it work.</React.Fragment>
                ],
                signature: { closing: "Letting go of frustration,", name: "R A F L I" }
            },
            ID: {
                title: "Amarah yang Memudar",
                paragraphs: [
                    <React.Fragment key="p74">Sisa-sisa frustrasi yang kurasakan soal bagaimana kita berakhir perlahan menghilang begitu saja. Marah butuh energi, dan jujur saja, aku sudah terlalu lelah.</React.Fragment>,
                    <React.Fragment key="p75">Aku tidak lagi menyalahkanmu. Kita cuma dua manusia kompleks yang sudah mencoba melakukan yang terbaik, tapi terkadang, itu semua tidak cukup untuk mempertahankan semuanya.</React.Fragment>
                ],
                signature: { closing: "Melepas kecewa,", name: "R A F L I" }
            }
        }
    },
    {
        id: '20',
        date: 'March 3, 2026',
        content: {
            EN: {
                title: "Imagining You Happy",
                paragraphs: [
                    <React.Fragment key="p76">I hope wherever you are, you're smiling. I hope your days are filled with the kind of joy that reaches your eyes, the one I used to see when we talked.</React.Fragment>,
                    <React.Fragment key="p77">I am finally learning to want the best for you, even if the best means a future without me in it.</React.Fragment>
                ],
                signature: { closing: "Hoping you're well,", name: "R A F L I" }
            },
            ID: {
                title: "Membayangkan Bahagiamu",
                paragraphs: [
                    <React.Fragment key="p78">Aku harap di manapun kamu berada, kamu tersenyum. Aku harap hari-harimu dipenuhi dengan kebahagiaan yang terpancar dari matamu, kebahagiaan yang dulu sering kulihat saat kita bicara.</React.Fragment>,
                    <React.Fragment key="p79">Aku akhirnya belajar untuk menginginkan yang terbaik buatmu, bahkan jika yang terbaik itu berarti masa depan tanpa aku di dalamnya.</React.Fragment>
                ],
                signature: { closing: "Berharap kamu baik,", name: "R A F L I" }
            }
        }
    },
    {
        id: '21',
        date: 'March 5, 2026',
        content: {
            EN: {
                title: "A Note That Never Fully Ended",
                paragraphs: [
                    <React.Fragment key="p80">Dear <span className="font-semibold text-foreground">Cantika Intan Aulia</span>,</React.Fragment>,
                    <React.Fragment key="p81">I used to think that the best moments of my life were meant to be quiet, kept in a small space somewhere in the back of my mind. But when you entered my life, those quiet moments turned into something bright. Hearing your voice, talking about our days, and simply staying up with you until you fell asleep became the routines that made me forget how heavy the world was.</React.Fragment>,
                    <React.Fragment key="p82">But little by little, the brightness started to feel distant. Lately, living my days without you feels like constantly walking through a room that is painfully empty. The things we used to do seamlessly have turned into a difficult silence. My chest feels incredibly tight trying to understand where we went wrong, and the hardest part is recognizing that the feelings are still here, but you aren't.</React.Fragment>,
                    <React.Fragment key="p83">Seeing you online and reading our old chats no longer brings a smile to my face; it just brings back a flood of questions. Even right now, as I sit here coding this website, it takes everything in me just to keep the memories from overwhelming my mind. I try to escape into games, keeping myself busy so I don't have to face the silence, but deep down, I am still so incredibly tired from fighting this feeling of longing.</React.Fragment>,
                    <React.Fragment key="p84">I reached out recently, trying to suppress the ego that told me not to, because I was terrified that if I didn't say anything, the silence between us would become permanent. But your replies felt so distant, just straight text and a polite formality that confirmed we had become strangers who once knew everything about each other.</React.Fragment>,
                    <React.Fragment key="p85">I am not writing this to make you feel guilty or to force you into a corner. I just needed a place to put all these unsent words, a place where I can finally be honest without the fear of interrupting your life. I am slowly letting you go, learning how to walk through the days and appreciate what we once had without expecting it to return.</React.Fragment>,
                    <React.Fragment key="p86">If life takes you on a beautiful journey, I genuinely hope you find all the happiness you deserve. But quietly, in the spaces where pride no longer matters, a small part of me is still hoping that one day, somehow, we'll find our way back to simply saying 'hi' again. Just two people, no longer hiding behind distance or hesitation.</React.Fragment>,
                    <React.Fragment key="p87">Take care, wherever you go.</React.Fragment>
                ],
                signature: { closing: "With love, always,", name: "R A F L I" }
            },
            ID: {
                title: "Catatan Yang Belum Selesai",
                paragraphs: [
                    <React.Fragment key="p88">Dear <span className="font-semibold text-foreground">Cantika Intan Aulia</span>,</React.Fragment>,
                    <React.Fragment key="p89">Dulu aku sempet mikir kalau momen terbaik di hidupku itu cuma bakal jadi sesuatu yang tenang, kusimpan sendiri di pikiranku. Tapi pas kamu masuk ke kehidupanku, hal-hal tenang itu berubah jadi sesuatu yang cerah banget. Dengerin suaramu, cerita soal hari kita, sampai nemenin kamu ngobrol di malam hari sampai kamu ketiduran udah jadi rutinitas yang bikin aku lupa betapa beratnya dunia di luar sana.</React.Fragment>,
                    <React.Fragment key="p90">Tapi pelan-pelan, cerahnya mulai kerasa jauh. Akhir-akhir ini, ngejalanin hari tanpa kamu rasanya kayak terus-terusan jalan di ruangan yang kosong banget. Hal-hal yang biasa kita rutinin gampang banget dulu, sekarang cuma ninggalin keheningan yang susah banget dihadapin. Dadaku rasanya sesak pas nyoba mahamin di mana letak salah kita, dan bagian paling beratnya adalah sadar kalau perasaanku masih di sini, tapi kamunya udah nggak ada.</React.Fragment>,
                    <React.Fragment key="p91">Tiap liat kamu online dan baca chat lama kita, aku nggak lagi bisa senyum; yang ada cuma muncul banyak pertanyaan. Bahkan detik ini, pas aku lagi duduk ngoding website ini, aku butuh sisa-sisa tenagaku buat nahan semua kenangan itu biar nggak terlalu menuhi pikiranku. Aku coba kabur lewat game, nyibukin diri biar nggak harus berhadapan sama hening, tapi jauh di dalam hati, aku masih ngerasa capek banget nahan rasa kangen ini.</React.Fragment>,
                    <React.Fragment key="p92">Baru-baru ini aku nyoba ngabarin kamu, maksa nurunin ego yang nyuruh aku diam, cuma gara-gara dua hal: karena aku takut banget kalau aku nggak ngelakuin apa-apa, keheningan di antara kita bakal beneran jadi selamanya. Tapi balasanmu kerasa jauh banget, cuma teks biasa dan formalitas yang secara nggak langsung mengkonfirmasi kalau kita emang udah jadi dua orang asing yang dulunya pernah tau segalanya tentang satu sama lain.</React.Fragment>,
                    <React.Fragment key="p93">Tulisan ini bukan buat bikin kamu merasa bersalah, bukan juga buat mojokkin kamu. Aku cuma ngerasa butuh sebuah ruang buat numpahin semua kata-kata yang nggak pernah sempet terkirim, tempat di mana aku akhirnya bisa jujur tanpa takut ganggu kesibukanmu sekarang. Aku pelan-pelan mencoba ngelepasin kamu, belajar pelan-pelan buat ngejalanin hari dan ngerhargai apa yang pernah kita punya, tanpa harus berekspektasi itu bakal balik lagi.</React.Fragment>,
                    <React.Fragment key="p94">Kalau misalnya di luar sana kamu nemuin bahagia yang baru, aku ikhlas dan bener-bener berharap kamu dapat yang terbaik. Tapi diam-diam, di ruang yang paling kecil di mana gengsi udah nggak punya tempat lagi, sebagian kecil dari hatiku masih berharap kalau suatu hari nanti, kita bakal bisa sekadar ngomong 'hai' lagi. Cuma dua orang yang udah nggak lagi sembunyi di balik jarak atau keraguan.</React.Fragment>,
                    <React.Fragment key="p95">Jaga diri baik-baik di sana ya.</React.Fragment>
                ],
                signature: { closing: "Dengan sayang, selalu,", name: "R A F L I" }
            }
        }
    }
];

