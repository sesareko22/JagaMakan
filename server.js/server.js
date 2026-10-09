const express = require('express');
const { Resend } = require('resend');

const app = express();
app.use(express.json());

// Inisialisasi Resend dengan API Key Anda yang benar
const resend = new Resend(process.env.RESEND_API_KEY);

app.post('/api/register', async (req, res) => {
    const { email, name } = req.body;

    try {
        // Simpan data user ke database Anda di sini (opsional/sesuai kebutuhan)

        // Kirim Welcome Email via Resend
        const { data, error } = await resend.emails.send({
            from: 'JagaMakan <support@jagamakan.id>',
            to: [email],
            subject: 'Selamat Datang di JagaMakan! 🎉 Langkah Awal Menuju Hidup Lebih Sehat',
            html: `
                <p>Halo <strong>${name}</strong>,</p>
                <p>Terima kasih telah mendaftar dan bergabung dengan <strong>JagaMakan</strong>! Kami sangat senang bisa menjadi bagian dari perjalanan Anda dalam membangun pola hidup dan kebiasaan makan yang lebih sehat.</p>

                <p>JagaMakan hadir untuk mempermudah Anda menjaga kesehatan tanpa ribet. Berikut adalah beberapa keunggulan utama yang bisa Anda nikmati:</p>
                <ul>
                    <li>📊 <strong>Pelacakan Kalori & Nutrisi Harian:</strong> Pantau asupan kalori, protein, dan karbohidrat harian Anda dengan mudah agar tetap seimbang sesuai kebutuhan tubuh.</li>
                    <li>🎯 <strong>Target yang Dipersonalisasi:</strong> Dapatkan panduan dan pencatatan porsi yang pas untuk mendukung kesehatan serta berat badan ideal Anda.</li>
                </ul>

                <p>Yuk, mulai langkah kecil pertama Anda hari ini dengan mencatat makanan pertama Anda di aplikasi!</p>

                <p>Jika Anda memiliki pertanyaan, masukan, atau kendala, jangan ragu untuk membalas email ini atau menghubungi tim dukungan kami.</p>

                <br>
                <p>Salam sehat,<br>
                <strong>Tim JagaMakan</strong></p>
            `
        });

        if (error) {
            return res.status(400).json({ error });
        }

        res.status(200).json({ message: 'Registrasi berhasil & email terkirim!', data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => console.log('Server JagaMakan berjalan di port 3000'));