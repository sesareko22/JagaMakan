const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }

    const { email, name } = req.body || {};

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const userName = name || 'Pengguna';

    try {
        const { data, error } = await resend.emails.send({
            from: 'JagaMakan <support@jagamakan.id>',
            to: [email],
            subject: 'Selamat Datang di JagaMakan! 🎉 Langkah Awal Menuju Hidup Lebih Sehat',
            html: `
                <div style='font-family:Arial,sans-serif;padding:24px;border-radius:12px;background:#f4f9f5;color:#0f172a;line-height:1.6;'>
                    <h2 style='color:#16A34A;'>Selamat Datang di JagaMakan! 🎉</h2>
                    <p style='font-weight:bold;'>Langkah Awal Menuju Hidup Lebih Sehat</p>
                    <p>Halo <b>${userName}</b>,</p>
                    <p>Terima kasih telah mendaftar dan bergabung dengan JagaMakan! Kami sangat senang bisa menjadi bagian dari perjalanan Anda dalam membangun pola hidup dan kebiasaan makan yang lebih sehat.</p>
                    <p>JagaMakan hadir untuk mempermudah Anda menjaga kesehatan tanpa ribet. Berikut adalah beberapa keunggulan utama yang bisa Anda nikmati:</p>
                    <ul style='list-style-type:none;padding-left:0;'>
                        <li style='margin-bottom:10px;'>📊 <b>Pelacakan Kalori & Nutrisi Harian:</b> Pantau asupan kalori, protein, dan karbohidrat harian Anda dengan mudah agar tetap seimbang sesuai kebutuhan tubuh.</li>
                        <li style='margin-bottom:10px;'>🎯 <b>Target yang Dipersonalisasi:</b> Dapatkan panduan dan pencatatan porsi yang pas untuk mendukung kesehatan serta berat badan ideal Anda.</li>
                    </ul>
                    <p>Yuk, mulai langkah kecil pertama Anda hari ini dengan mencatat makanan pertama Anda di aplikasi!</p>
                    <p>Jika Anda memiliki pertanyaan, masukan, atau kendala, jangan ragu untuk membalas email ini atau menghubungi tim dukungan kami.</p>
                    <br/>
                    <p>Salam sehat,</p>
                    <p style='font-weight:bold;color:#16A34A;'>Tim JagaMakan</p>
                    <hr style='border:0;border-top:1px solid #d1d5db;margin:20px 0;'/>
                    <p style='font-size:11px;color:#64748B;'>Email ini dikirim otomatis oleh sistem dari support@jagamakan.id | jagamakan.id</p>
                </div>
            `
        });

        if (error) {
            return res.status(400).json({ error });
        }

        return res.status(200).json({ message: 'Welcome email sent successfully!', data });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
