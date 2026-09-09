'use client';
import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface QueuedUser { id: string; language: string; country: string; gender: string; matched: boolean; }

export default function FinderPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const [matchStatus, setMatchStatus] = useState("");
  const [messages, setMessages] = useState<{sender: string, text: string}[]>([]);
  const [inputMsg, setInputMsg] = useState("");
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [selectedCountry, setSelectedCountry] = useState("global");
  const [selectedGender, setSelectedGender] = useState("any");
  const [onlineCount, setOnlineCount] = useState(0);
  const [matchTimer, setMatchTimer] = useState(0);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const myIdRef = useRef(Math.random().toString(36).substring(2, 10));

  const translations: Record<string, Record<string, string>> = {
    en: { finder:"Finder",country:"Country/Region",global:"Global",gender:"Gender",any:"Any",male:"Male",female:"Female",sendMessage:"Send a message...",start:"Start Matching",stop:"Stop",next:"Next",toggleMenu:"Menu",logout:"Log Out",strangerVideo:"Stranger Video",yourCamera:"Your Camera",readyToConnect:"Ready to connect",searching:"Searching...",matching:"Finding a match...",matchingTime:"Waiting",onlineNow:"Online",noCamera:"Camera not available!",matchFound:"Match found!",noMatch:"No match found",language:"Language",matchingStatus:"Match Status",queuePosition:"In queue...",cancelMatch:"Cancel",report:"Report",reportUser:"Report User",confirmReport:"Report this user?",reportSuccess:"Report submitted",reportFailed:"Report failed",inappropriate:"Inappropriate Content",harassment:"Harassment",deleteAccount:"Delete Account",confirmDeleteAccount:"Delete your account?" },
    zh: { finder:"Finder",country:"国家/地区",global:"全球",gender:"性别",any:"不限",male:"男",female:"女",sendMessage:"发消息...",start:"开始匹配",stop:"挂断",next:"下一个",toggleMenu:"菜单",logout:"退出登录",strangerVideo:"对方视频",yourCamera:"你的摄像头",readyToConnect:"准备连接",searching:"搜索中...",matching:"正在寻找匹配...",matchingTime:"等待中",onlineNow:"在线",noCamera:"无法获取摄像头！",matchFound:"匹配成功！",noMatch:"未找到匹配",language:"语言",matchingStatus:"匹配状态",queuePosition:"排队中...",cancelMatch:"取消",report:"举报",reportUser:"举报用户",confirmReport:"确定要举报该用户吗？",reportSuccess:"举报已成功提交",reportFailed:"举报失败",inappropriate:"不当内容",harassment:"骚扰",deleteAccount:"注销账号",confirmDeleteAccount:"确定要永久注销账号吗？" },
    es: { finder:"Finder",country:"País",global:"Global",gender:"Género",any:"Cualquiera",male:"Hombre",female:"Mujer",sendMessage:"Enviar mensaje...",start:"Buscar",stop:"Detener",next:"Siguiente",toggleMenu:"Menú",logout:"Salir",strangerVideo:"Video del Otro",yourCamera:"Tu Cámara",readyToConnect:"Listo",searching:"Buscando...",matching:"Buscando...",matchingTime:"Esperando",onlineNow:"En línea",noCamera:"¡Cámara no disponible!",matchFound:"¡Coincidencia!",noMatch:"Sin coincidencias",language:"Idioma",matchingStatus:"Estado",queuePosition:"En cola...",cancelMatch:"Cancelar",report:"Reportar",reportUser:"Reportar",confirmReport:"¿Reportar?",reportSuccess:"Enviado",reportFailed:"Error",inappropriate:"Contenido inapropiado",harassment:"Acoso",deleteAccount:"Eliminar Cuenta",confirmDeleteAccount:"¿Eliminar cuenta?" },
    hi: { finder:"Finder",country:"देश",global:"वैश्विक",gender:"लिंग",any:"कोई भी",male:"पुरुष",female:"महिला",sendMessage:"संदेश...",start:"मिलान शुरू",stop:"रोकें",next:"अगला",toggleMenu:"मेनू",logout:"लॉग आउट",strangerVideo:"अजनबी वीडियो",yourCamera:"आपका कैमरा",readyToConnect:"तैयार",searching:"खोज...",matching:"मिलान खोज...",matchingTime:"प्रतीक्षा",onlineNow:"ऑनलाइन",noCamera:"कैमरा नहीं!",matchFound:"मिलान मिला!",noMatch:"कोई मिलान नहीं",language:"भाषा",matchingStatus:"स्थिति",queuePosition:"कतार...",cancelMatch:"रद्द",report:"रिपोर्ट",reportUser:"रिपोर्ट",confirmReport:"रिपोर्ट?",reportSuccess:"सफल",reportFailed:"विफल",inappropriate:"अनुचित",harassment:"उत्पीड़न",deleteAccount:"खाता हटाएं",confirmDeleteAccount:"खाता हटाएं?" },
    ar: { finder:"Finder",country:"البلد",global:"عالمي",gender:"الجنس",any:"الكل",male:"ذكر",female:"أنثى",sendMessage:"أرسل رسالة...",start:"ابدأ",stop:"توقف",next:"التالي",toggleMenu:"القائمة",logout:"خروج",strangerVideo:"فيديو الغريب",yourCamera:"كاميرتك",readyToConnect:"جاهز",searching:"بحث...",matching:"مطابقة...",matchingTime:"انتظار",onlineNow:"متصل",noCamera:"لا كاميرا!",matchFound:"تمت المطابقة!",noMatch:"لا مطابقة",language:"اللغة",matchingStatus:"الحالة",queuePosition:"طابور...",cancelMatch:"إلغاء",report:"إبلاغ",reportUser:"إبلاغ",confirmReport:"إبلاغ?",reportSuccess:"تم",reportFailed:"فشل",inappropriate:"محتوى غير لائق",harassment:"تحرش",deleteAccount:"حذف الحساب",confirmDeleteAccount:"حذف الحساب؟" },
    bn: { finder:"Finder",country:"দেশ",global:"বিশ্বব্যাপী",gender:"লিঙ্গ",any:"যেকোনো",male:"পুরুষ",female:"মহিলা",sendMessage:"বার্তা...",start:"মিলান",stop:"থামুন",next:"পরবর্তী",toggleMenu:"মেনু",logout:"লগ আউট",strangerVideo:"অপরিচিতের ভিডিও",yourCamera:"আপনার ক্যামেরা",readyToConnect:"প্রস্তুত",searching:"খুঁজছেন...",matching:"মিলান খুঁজছেন...",matchingTime:"অপেক্ষা",onlineNow:"অনলাইন",noCamera:"ক্যামেরা নেই!",matchFound:"মিলান পেয়েছেন!",noMatch:"মিলান নেই",language:"ভাষা",matchingStatus:"অবস্থা",queuePosition:"লাইন...",cancelMatch:"বাতিল",report:"রিপোর্ট",reportUser:"রিপোর্ট",confirmReport:"রিপোর্ট?",reportSuccess:"সফল",reportFailed:"ব্যর্থ",inappropriate:"অনুপযুক্ত",harassment:"হয়রানি",deleteAccount:"মুছুন",confirmDeleteAccount:"মুছবেন?" },
    pt: { finder:"Finder",country:"País",global:"Global",gender:"Gênero",any:"Qualquer",male:"Masculino",female:"Feminino",sendMessage:"Enviar mensagem...",start:"Buscar",stop:"Parar",next:"Próximo",toggleMenu:"Menu",logout:"Sair",strangerVideo:"Vídeo do Outro",yourCamera:"Sua Câmera",readyToConnect:"Pronto",searching:"Procurando...",matching:"Buscando...",matchingTime:"Aguardando",onlineNow:"Online",noCamera:"Câmera indisponível!",matchFound:"Correspondência encontrada!",noMatch:"Sem correspondências",language:"Idioma",matchingStatus:"Status",queuePosition:"Na fila...",cancelMatch:"Cancelar",report:"Reportar",reportUser:"Denunciar",confirmReport:"Denunciar?",reportSuccess:"Enviado",reportFailed:"Falha",inappropriate:"Conteúdo Inapropriado",harassment:"Assédio",deleteAccount:"Excluir Conta",confirmDeleteAccount:"Excluir conta?" },
    ru: { finder:"Finder",country:"Страна",global:"Глобально",gender:"Пол",any:"Любой",male:"Мужской",female:"Женский",sendMessage:"Отправить сообщение...",start:"Начать поиск",stop:"Стоп",next:"Далее",toggleMenu:"Меню",logout:"Выйти",strangerVideo:"Видео собеседника",yourCamera:"Ваша камера",readyToConnect:"Готов",searching:"Поиск...",matching:"Поиск совпадений...",matchingTime:"Ожидание",onlineNow:"Онлайн",noCamera:"Камера недоступна!",matchFound:"Совпадение найдено!",noMatch:"Нет совпадений",language:"Язык",matchingStatus:"Статус",queuePosition:"В очереди...",cancelMatch:"Отмена",report:"Пожаловаться",reportUser:"Пожаловаться",confirmReport:"Пожаловаться?",reportSuccess:"Отправлена",reportFailed:"Ошибка",inappropriate:"Неприемлемый контент",harassment:"Домогательство",deleteAccount:"Удалить аккаунт",confirmDeleteAccount:"Удалить аккаунт?" },
    ja: { finder:"Finder",country:"国/地域",global:"グローバル",gender:"性別",any:"指定なし",male:"男性",female:"女性",sendMessage:"メッセージ...",start:"マッチング開始",stop:"停止",next:"次へ",toggleMenu:"メニュー",logout:"ログアウト",strangerVideo:"相手のビデオ",yourCamera:"あなたのカメラ",readyToConnect:"接続準備完了",searching:"検索中...",matching:"マッチを探しています...",matchingTime:"待機中",onlineNow:"オンライン",noCamera:"カメラが利用できません！",matchFound:"マッチ発見！",noMatch:"マッチなし",language:"言語",matchingStatus:"ステータス",queuePosition:"待機中...",cancelMatch:"キャンセル",report:"報告",reportUser:"報告",confirmReport:"報告しますか？",reportSuccess:"送信されました",reportFailed:"失敗",inappropriate:"不適切なコンテンツ",harassment:"嫌がらせ",deleteAccount:"アカウント削除",confirmDeleteAccount:"削除しますか？" },
    fr: { finder:"Finder",country:"Pays/Région",global:"Mondial",gender:"Genre",any:"Tous",male:"Homme",female:"Femme",sendMessage:"Envoyer un message...",start:"Lancer",stop:"Arrêter",next:"Suivant",toggleMenu:"Menu",logout:"Déconnexion",strangerVideo:"Vidéo de l'autre",yourCamera:"Votre caméra",readyToConnect:"Prêt",searching:"Recherche...",matching:"Recherche correspondance...",matchingTime:"En attente",onlineNow:"En ligne",noCamera:"Caméra indisponible!",matchFound:"Correspondance trouvée!",noMatch:"Aucune correspondance",language:"Langue",matchingStatus:"Statut",queuePosition:"En file...",cancelMatch:"Annuler",report:"Signaler",reportUser:"Signaler",confirmReport:"Signaler?",reportSuccess:"Envoyé",reportFailed:"Échec",inappropriate:"Contenu inapproprié",harassment:"Harcèlement",deleteAccount:"Supprimer le compte",confirmDeleteAccount:"Supprimer le compte?" },
  };
  const t = translations[selectedLanguage] || translations.en;

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) { router.replace("/login"); } else { setIsChecking(false); }
  }, [router]);

  useEffect(() => {
    const interval = setInterval(() => { setOnlineCount(Math.floor(Math.random() * 50) + 10); }, 3000);
    setOnlineCount(Math.floor(Math.random() * 50) + 10);
    return () => clearInterval(interval);
  }, []);

  const findMatch = useCallback((myPrefs: { language: string; country: string; gender: string }): QueuedUser | null => {
    const queue: QueuedUser[] = JSON.parse(localStorage.getItem("match_queue") || "[]");
    const candidates = queue.filter(u => u.id !== myIdRef.current && !u.matched);
    if (candidates.length === 0) return null;
    const scored = candidates.map(c => {
      let score = 0;
      if (c.language === myPrefs.language) score += 50;
      if (myPrefs.country === "global" || c.country === myPrefs.country || c.country === "global") score += 30;
      if (myPrefs.gender === "any" || c.gender === myPrefs.gender || c.gender === "any") score += 20;
      return { candidate: c, score };
    });
    scored.sort((a, b) => b.score - a.score);
    const best = scored[0];
    if (best.score >= 50) return best.candidate;
    return candidates[Math.floor(Math.random() * candidates.length)];
  }, [selectedLanguage, selectedCountry, selectedGender]);

  const startMatch = () => {
    setIsMatching(true);
    setMatchStatus(t.matching);
    setMatchTimer(0);
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;
        const myProfile: QueuedUser = { id: myIdRef.current, language: selectedLanguage, country: selectedCountry, gender: selectedGender, matched: false };
        const queue: QueuedUser[] = JSON.parse(localStorage.getItem("match_queue") || "[]");
        queue.push(myProfile);
        localStorage.setItem("match_queue", JSON.stringify(queue));
        let seconds = 0;
        timerRef.current = setInterval(() => {
          seconds++;
          setMatchTimer(seconds);
          const match = findMatch({ language: selectedLanguage, country: selectedCountry, gender: selectedGender });
          if (match) {
            clearInterval(timerRef.current!);
            setMatchStatus(t.matchFound);
            const updatedQueue: QueuedUser[] = JSON.parse(localStorage.getItem("match_queue") || "[]");
            updatedQueue.forEach(u => { if (u.id === myIdRef.current || u.id === match.id) u.matched = true; });
            localStorage.setItem("match_queue", JSON.stringify(updatedQueue));
            setTimeout(() => { setIsMatching(false); setIsConnected(true); setMatchStatus(""); }, 800);
          }
          if (seconds >= 5 && !match) {
            const langs = ["en","zh","es","hi","ja","fr","ru","pt","ar","bn"];
            const countries = ["US","CN","JP","GB","FR","DE","BR","IN","KR","global"];
            const genders = ["any","male","female"];
            const botUser: QueuedUser = { id: "bot_" + Math.random().toString(36).substring(2, 10), language: langs[Math.floor(Math.random() * langs.length)], country: countries[Math.floor(Math.random() * countries.length)], gender: genders[Math.floor(Math.random() * genders.length)], matched: false };
            const currentQueue: QueuedUser[] = JSON.parse(localStorage.getItem("match_queue") || "[]");
            currentQueue.push(botUser);
            localStorage.setItem("match_queue", JSON.stringify(currentQueue));
          }
        }, 1000);
      })
      .catch(() => { setIsMatching(false); setMatchStatus(""); alert(t.noCamera); });
  };

  const cancelMatch = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (localVideoRef.current?.srcObject) { (localVideoRef.current.srcObject as MediaStream).getTracks().forEach(tr => tr.stop()); localVideoRef.current.srcObject = null; }
    const queue: QueuedUser[] = JSON.parse(localStorage.getItem("match_queue") || "[]");
    localStorage.setItem("match_queue", JSON.stringify(queue.filter(u => u.id !== myIdRef.current)));
    setIsMatching(false); setMatchStatus(""); setMatchTimer(0);
  };

  const handleStop = () => {
    if (localVideoRef.current?.srcObject) { (localVideoRef.current.srcObject as MediaStream).getTracks().forEach(tr => tr.stop()); localVideoRef.current.srcObject = null; }
    if (remoteVideoRef.current?.srcObject) { (remoteVideoRef.current.srcObject as MediaStream).getTracks().forEach(tr => tr.stop()); remoteVideoRef.current.srcObject = null; }
    const queue: QueuedUser[] = JSON.parse(localStorage.getItem("match_queue") || "[]");
    localStorage.setItem("match_queue", JSON.stringify(queue.filter(u => u.id !== myIdRef.current)));
    setIsConnected(false); setMatchStatus(""); setMatchTimer(0);
  };

  const handleNext = () => { handleStop(); setTimeout(() => startMatch(), 500); };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.replace("/login");
  };

  const handleDeleteAccount = () => {
    if (confirm(t.confirmDeleteAccount)) {
      localStorage.clear();
      router.replace("/login");
    }
  };

  const sendMessage = () => {
    if (!inputMsg.trim()) return;
    setMessages(prev => [...prev, { sender: "me", text: inputMsg }]);
    setInputMsg("");
    setTimeout(() => { setMessages(prev => [...prev, { sender: "stranger", text: "Hello!" }]); }, 1500);
  };

  const handleReport = () => { setShowReportModal(true); };
  const confirmReport = () => { alert(t.reportSuccess); setShowReportModal(false); };

  const formatTime = (s: number) => { const m = Math.floor(s / 60); const sec = s % 60; return m + ":" + (sec < 10 ? "0" : "") + sec; };

  if (isChecking) return <div style={{ display:"flex", justifyContent:"center", alignItems:"center", height:"100vh", background:"#0f172a", color:"#fff" }}>Loading...</div>;

  return (
    <div style={{ display:"flex", height:"100vh", background:"#0f172a", color:"#fff", fontFamily:"sans-serif" }}>
      {/* Sidebar */}
      <div style={{ width: isSidebarOpen ? "220px" : "0", background:"#1e293b", transition:"width 0.3s", overflow:"hidden", display:"flex", flexDirection:"column", padding: isSidebarOpen ? "20px" : "0" }}>
        <h2 style={{ fontSize:"20px", marginBottom:"20px" }}>{t.finder}</h2>
        <div style={{ marginBottom:"15px" }}>
          <label style={{ fontSize:"12px", color:"#94a3b8" }}>{t.language}</label>
          <select value={selectedLanguage} onChange={e => setSelectedLanguage(e.target.value)} style={{ width:"100%", padding:"8px", borderRadius:"8px", border:"none", background:"#334155", color:"#fff", marginTop:"4px" }}>
            <option value="en">English</option><option value="zh">中文</option><option value="es">Español</option><option value="hi">हिन्दी</option><option value="ar">العربية</option><option value="bn">বাংলা</option><option value="pt">Português</option><option value="ru">Русский</option><option value="ja">日本語</option><option value="fr">Français</option>
          </select>
        </div>
        <div style={{ marginBottom:"15px" }}>
          <label style={{ fontSize:"12px", color:"#94a3b8" }}>{t.country}</label>
          <select value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)} style={{ width:"100%", padding:"8px", borderRadius:"8px", border:"none", background:"#334155", color:"#fff", marginTop:"4px" }}>
            <option value="global">{t.global}</option><option value="US">US</option><option value="CN">CN</option><option value="JP">JP</option><option value="GB">GB</option><option value="FR">FR</option><option value="DE">DE</option><option value="BR">BR</option><option value="IN">IN</option><option value="KR">KR</option>
          </select>
        </div>
        <div style={{ marginBottom:"15px" }}>
          <label style={{ fontSize:"12px", color:"#94a3b8" }}>{t.gender}</label>
          <select value={selectedGender} onChange={e => setSelectedGender(e.target.value)} style={{ width:"100%", padding:"8px", borderRadius:"8px", border:"none", background:"#334155", color:"#fff", marginTop:"4px" }}>
            <option value="any">{t.any}</option><option value="male">{t.male}</option><option value="female">{t.female}</option>
          </select>
        </div>
        <div style={{ marginBottom:"15px", fontSize:"13px", color:"#94a3b8" }}>{t.onlineNow}: <span style={{ color:"#22c55e" }}>{onlineCount}</span></div>
        <div style={{ flex:1 }}></div>
        <button onClick={handleLogout} style={{ padding:"10px", background:"#ef4444", border:"none", borderRadius:"8px", color:"#fff", cursor:"pointer", marginBottom:"8px" }}>{t.logout}</button>
        <button onClick={handleDeleteAccount} style={{ padding:"10px", background:"#991b1b", border:"none", borderRadius:"8px", color:"#fff", cursor:"pointer" }}>{t.deleteAccount}</button>
      </div>

      {/* Main Area */}
      <div style={{ flex:1, display:"flex", flexDirection:"column" }}>
        {/* Top Bar */}
        <div style={{ display:"flex", alignItems:"center", padding:"12px 20px", background:"#1e293b" }}>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={{ background:"none", border:"none", color:"#fff", fontSize:"20px", cursor:"pointer", marginRight:"15px" }}>☰</button>
          <span style={{ fontSize:"16px", fontWeight:"bold" }}>{t.finder}</span>
          <div style={{ flex:1 }}></div>
          {isMatching && <span style={{ color:"#facc15", fontSize:"14px" }}>{t.matching} {formatTime(matchTimer)}</span>}
          {isConnected && <span style={{ color:"#22c55e", fontSize:"14px" }}>Connected</span>}
        </div>

        {/* Video Area */}
        <div style={{ flex:1, display:"flex", gap:"10px", padding:"10px", overflow:"hidden" }}>
          <div style={{ flex:1, borderRadius:"12px", overflow:"hidden", background:"#000", position:"relative" }}>
            <video ref={remoteVideoRef} autoPlay playsInline style={{ width:"100%", height:"100%", objectFit:"cover" }} />
            {!isConnected && <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", color:"#64748b", fontSize:"14px" }}>{t.strangerVideo}</div>}
          </div>
          <div style={{ flex:1, borderRadius:"12px", overflow:"hidden", background:"#000", position:"relative" }}>
            <video ref={localVideoRef} autoPlay playsInline muted style={{ width:"100%", height:"100%", objectFit:"cover" }} />
            <div style={{ position:"absolute", bottom:"10px", left:"10px", color:"#fff", fontSize:"12px", background:"rgba(0,0,0,0.5)", padding:"2px 8px", borderRadius:"4px" }}>{t.yourCamera}</div>
          </div>
        </div>

        {/* Bottom Controls */}
        <div style={{ padding:"15px 20px", background:"#1e293b", display:"flex", alignItems:"center", gap:"10px" }}>
          {!isConnected && !isMatching && <button onClick={startMatch} style={{ padding:"12px 40px", background:"#22c55e", border:"none", borderRadius:"30px", color:"#fff", fontSize:"16px", fontWeight:"bold", cursor:"pointer" }}>{t.start}</button>}
          {isMatching && <button onClick={cancelMatch} style={{ padding:"12px 40px", background:"#ef4444", border:"none", borderRadius:"30px", color:"#fff", fontSize:"16px", fontWeight:"bold", cursor:"pointer" }}>{t.cancelMatch}</button>}
          {isConnected && <button onClick={handleStop} style={{ padding:"12px 30px", background:"#ef4444", border:"none", borderRadius:"30px", color:"#fff", fontSize:"16px", fontWeight:"bold", cursor:"pointer" }}>{t.stop}</button>}
          {isConnected && <button onClick={handleNext} style={{ padding:"12px 30px", background:"#3b82f6", border:"none", borderRadius:"30px", color:"#fff", fontSize:"16px", fontWeight:"bold", cursor:"pointer" }}>{t.next}</button>}
          {isConnected && <button onClick={handleReport} style={{ padding:"12px 20px", background:"#f59e0b", border:"none", borderRadius:"30px", color:"#fff", fontSize:"14px", cursor:"pointer" }}>{t.report}</button>}
          <div style={{ flex:1 }}></div>
          {isConnected && (
            <div style={{ display:"flex", gap:"8px" }}>
              <input value={inputMsg} onChange={e => setInputMsg(e.target.value)} onKeyDown={e => { if (e.key === "Enter") sendMessage(); }} placeholder={t.sendMessage} style={{ padding:"10px 16px", borderRadius:"20px", border:"none", background:"#334155", color:"#fff", width:"200px" }} />
              <button onClick={sendMessage} style={{ padding:"10px 20px", background:"#3b82f6", border:"none", borderRadius:"20px", color:"#fff", cursor:"pointer" }}>Send</button>
            </div>
          )}
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div style={{ position:"fixed", top:0, left:0, right:0, bottom:0, background:"rgba(0,0,0,0.7)", display:"flex", justifyContent:"center", alignItems:"center", zIndex:100 }}>
          <div style={{ background:"#1e293b", padding:"30px", borderRadius:"16px", width:"300px" }}>
            <h3 style={{ marginBottom:"15px" }}>{t.reportUser}</h3>
            <p style={{ color:"#94a3b8", marginBottom:"20px", fontSize:"14px" }}>{t.confirmReport}</p>
            <div style={{ display:"flex", gap:"10px" }}>
              <button onClick={confirmReport} style={{ flex:1, padding:"10px", background:"#ef4444", border:"none", borderRadius:"8px", color:"#fff", cursor:"pointer" }}>{t.report}</button>
              <button onClick={() => setShowReportModal(false)} style={{ flex:1, padding:"10px", background:"#334155", border:"none", borderRadius:"8px", color:"#fff", cursor:"pointer" }}>{t.cancelMatch}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
