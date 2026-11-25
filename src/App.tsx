import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, 
  FileText, 
  Search, 
  Briefcase, 
  MapPin, 
  User, 
  GraduationCap, 
  Languages, 
  Monitor, 
  CheckCircle2, 
  Calendar,
  Phone,
  Facebook,
  Mail,
  Heart,
  Star,
  Info,
  Clock,
  Zap,
  Building2,
  Wallet,
  FileUp,
  Target,
  Rocket,
  Compass,
  Layout,
  Link as LinkIcon,
  ExternalLink,
  BookOpen,
  HandHeart,
  AlertCircle,
  Lightbulb,
  Loader2
} from 'lucide-react';

export default function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxbsacxr-9oklcldnFDWEpckLGVaW_GJNf276mTM_6PcvGkMQ9gcAVtndNh3LSNxHNw/exec";

  const geoData: Record<string, string[]> = {
    "ນະຄອນຫລວງວຽງຈັນ": ["ຈັນທະບູລີ", "ສີໂຄດຕະບອງ", "ໄຊເສດຖາ", "ສີສັດຕະນາກ", "ນາຊາຍທອງ", "ໄຊທານີ", "ຫາດຊາຍຟອງ", "ສັງທອງ", "ປາກງື່ມ"],
    "ຄຳມ່ວນ": ["ທ່າແຂກ", "ຫນອງບົກ", "ເຊບັ້ງໄຟ", "ຫີນບູນ", "ມະຫາໄຊ", "ຍົມມະລາດ", "ບົວລະພາ", "ນາກາຍ", "ໄຊບົວທອງ", "ຄູນຄຳ"],
    "ຈຳປາສັກ": ["ນະຄອນປາກເຊ", "ຊະນະສົມບູນ", "ບາຈຽງຈະເລີນສຸກ", "ປາກຊ່ອງ", "ປະທຸມພອນ", "ໂພນທອງ", "ຈຳປາສັກ", "ສຸຂຸມາ", "ມູນລະປະໂມກ", "ໂხງ"],
    "ສາລະວັນ": ["ສາລະວັນ", "ລະຄອນເພັງ", "ວາປີ", "ເລົ່າງາມ", "ຕຸ້ມລານ", "ຕະໂອ້ຍ", "ຄົງເຊໂດນ", "ສະຫມ້ວຍ"],
    "ສະຫວັນນະເຂດ": ["ນະຄອນໄກສອນ", "ອຸທຸມພອນ", "ອາດສະພັງທອງ", "ພິນ", "ເຊໂປນ", "ນອງ", "ທ່່າປາງທອງ", "ສອງຄອນ", "ຈຳພອນ", "ຊົນນະບູລີ", "ໄຊບູລີ", "ວິລະບູລີ", "ອາດສະພອນ", "ໄຊພູທອງ", "ພະລານໄຊ"],
    "ຊຽງຂວາງ": ["ໂພນສະຫວັນ (ແປກ)", "ຄຳ", "ຫນອງແຮດ", "ຄູນ", "ຫມອກ", "ພູກູດ", "ຜາໄຊ"],
    "ໄຊຍະບູລີ": ["ບໍ່ແຕ່ນ", "ຫົງສາ", "ແກ່ນທ້າວ", "ຄອບ", "ເງິນ", "ປາກລາຍ", "ພຽງ", "ທົ່ງມີໄຊ", "ໄຊຍະບູລີ", "ຊຽງຮ່ອນ", "ໄຊສະຖານ"],
    "ໄຊສົມບູນ": ["ອານຸວົງ", "ຮົ່ມ", "ທ່າໂທມ", "ລ້ອງແຈ້ງ", "ລ້ອງຊານ"],
    "ເຊກອງ": ["ທ່າແຕງ", "ລະມາມ", "ກະລືມ", "ດັກຈຶງ"],
    "ບໍລິຄຳໄຊ": ["ປາກຊັນ", "ທ່າພະບາດ", "ປາກກະດິງ", "ບໍລິຄັນ", "ຄຳເກີດ", "ວຽງທອງ", "ໄຊຈຳພອນ"],
    "ບໍ່ແກ້ວ": ["ຫ້ວຍຊາຍ", "ຕົ້ນເຜິ້ງ", "ເມິງ", "ຜາອຸດົມ", "ເມືອງປາກທາ"],
    "ຜົ້ງສາລີ": ["ຜົ້ງສາລີ", "ບຸນໃຕ້", "ຂວາ", "ໃຫມ່", "ຍອດອູ", "ສຳພັນ", "ບຸນເຫນືອ"],
    "ຫລວງນ້ຳທາ": ["ຫລວງນ້ຳທາ", "ສິງ", "ລອງ", "ວຽງພູຄາ", "ນາແລ"],
    "ຫລວງພຣະບາງ": ["ນະຄອນຫລວງພຣະບາງ", "ຊຽງເງິນ", "ນານ", "ປາກອຸ", "ນ້ຳບາກ", "ງອຍ", "ປາກແຊງ", "ໂພນໄຊ", "ຈອມເພັດ", "ວຽງຄຳ", "ພູຄຸນ", "ໂພນທອງ"],
    "ວຽງຈັນ": ["ເຟືອງ", "ຫີນເຫິບ", "ກາສີ", "ແກ້ວອຸດົມ", "ແມດ", "ໂພນໂຮງ", "ທຸລະຄົມ", "ວັງວຽງ", "ວຽງຄຳ", "ຊະນະຄາມ", "ຫມື່ນ"],
    "ຫົວພັນ": ["ຊຳເຫນືອ", "ຊຽງຄໍ້", "ຮ້ຽມ", "ວຽງໄຊ", "ຫົວເມືອງ", "ຊຳໃຕ້", "ສົບເບົາ", "ແອດ", "ກວັນ", "ຊ່ອນ"],
    "ອັດຕະປື": ["...ໄຊເຊດຖາ", "ສາມັກຄີໄຊ", "ສະຫນາມໄຊ", "ຊານໄຊ", "ພູວົງ"],
    "ອູດົມໄຊ": ["ໄຊ", "ຫລາ", "ນາຫມໍ້", "ງາ", "ແບ່ງ", "ຮຸນ", "ປາກແບ່ງ"]
  };

  const serviceOptions = [
    { label: 'ຊ່ວຍຂຽນ CV', value: 'ຊ່ວຍຂຽນ CV' },
    { label: 'ຝາກປະຫວັດການເຮັດວຽກ ຫຼື CV', value: 'ຝາກປະຫວັດການເຮັດວຽກ ຫຼື CV' },
    { label: 'ຝຶກອົບຮົມທັກສະການກຽມຄວາມພ້ອມກ່ອນສະໝັກງານ', value: 'ຝຶກອົບຮົມທັກສະການກຽມຄວາມພ້ອມກ່ອນສະໝັກງານ' },
    { label: 'ຝຶກອົບຮົມທັກສະຕ່າງໆ', value: 'ຝຶກອົບຮົມທັກສະຕ່າງໆ' },
    { label: 'ປຶກສາເລື່ອງສາຍອາຊີບ', value: 'ປຶກສາເລື່ອງສາຍອາຊີບ' },
    { label: 'ເຂົ້າຮ່ວມກິດຈະກຳເຜີຍແຜ່', value: 'ເຂົ້າຮ່ວມກິດຈະກຳເຜີຍແຜ່' },
    { label: 'ຝຶກງານ', value: 'ຝຶກງານ' },
    { label: 'ສະໝັກງານ', value: 'ສະໝັກງານ' },
    { label: 'ປຶກສາຮຽນຕໍ່', value: 'ປຶກສາຮຽນຕໍ່' },
    { label: 'ທຶນການສຶກສາ', value: 'ທຶນການສຶກສາ' },
    { label: 'ວຽກຈິດອາສາ', value: 'ວຽກຈິດອາສາ' }
  ];

  const personalityOptions = [
    "ມັກໃຫ້ຄຳປືກສາໝູ່ເພື່ອນ", "ມັກເດີນທາງ", "ມັກວາງແຜນ", "ມັກລົງທືນ", "ມັກຄ້າຂາຍ", 
    "ມັກຖ່າຍຮູບ", "ມັກຄົ້ນຄວ້າວິໄຈ", "ມັກແຕ່ງກີນ", "ມັກສ້ອມແປງລົດ", "ມັກກໍ່ສ້າງ", 
    "ມັກບັນຍາຍປາກເວົ້າຕໍ່ໜ້າມ່ວນຊົນ", "ມັກສອນ", "ມັກໄລ້ສົດຂາຍເຄື່ອງ", "ມັກຂຽນບົດຄວາມ", 
    "ມັກອ່ານ", "ມັກອອກແບບ", "ມັກສ້ອມແປງເຄື່ອງໃຊ້ໄຟຟ້າ", "ມັກຂຽນໂປຣແກຣມ", 
    "ມັກຄວາມເປັນລະບຽບ", "ມັກຕັດຫຍິບ", "ມັກເຈລະຈາ", "ມັກຝືກຫັດ ແລະ ເວົ້າພາຕ່າງປະເທດ", 
    "ມັກຈັດງ້ານສັງສັນ", "ມັກສະແດງບົດບາດ"
  ];

  const workplaceOptions = [
    "ມັກເຮັດວຽກຢູ່ຫ້ອງການກັບພາກສ່ວນບໍລິສັດ",
    "ມັກເຮັດວຽກຢູ່ພາກສະໜາມພາກປະຕິບັດຕົວຈິງ",
    "ມັກເຮັດວຽກອິດສະຫຼະ",
    "ຢາກຮຽນຕໍ່ໃນລະດັບທີ່ສູງກວ່າ",
    "ຢາກເຮັດວຽກຢູ່ຫ້ອງການກັບພາກສ່ວນລັດຖະບານ",
    "ມັກເຮັດວຽກກັບອົງການຈັດຕັ້ງສາກົນ",
    "ຢາກເຮັດທຸລະກິດເປັນຂອງຕົນເອງ"
  ];

  const suitableJobOptions = [
    "ບໍລິຫານ", "ບັນຊີ", "ການເງິນ", "ການຕະຫຼາດ", "ວິສະວະກອນ", 
    "ໂປຣແກຣມເມີ", "ນັກຂຽນ", "ນັກເວົ້າຕໍ່ໜ້າມວນຊົນ", "ຄ້າຂາຍ", 
    "ນັກການທູດ", "ນັກວິໄຈ"
  ];

  const [formData, setFormData] = useState<any>({
    timestamp: '',
    participationMode: '',
    location: '',
    onlineChannel: '',
    onlineChannelOther: '',
    status: '', 
    visitType: '', 
    visitCount: '',
    timeSinceLastVisit: '',

    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    dob: '',
    ethnicity: '',
    birthProvince: '',
    birthDistrict: '',
    birthVillage: '',
    currentProvince: '',
    currentDistrict: '',
    currentVillage: '',
    livingWith: '',
    phone: '',
    email: '',
    facebook: '',
    
    studyAt: '',
    gradeLevel: '',
    studyDestination: '',
    interestedFaculty: '',
    faculty: '',
    major: '',
    gradYear: '',
    startYear: '',
    expectedGradYear: '',
    hasInterned: '',
    internshipPlace: '',
    internDuration: '', 
    gpa: '',
    workDuration: '', 
    workPlace: '',
    currentOccupation: '',
    position: '',
    salary: '',
    expectedSalary: '',

    englishLevel: '',
    chineseLevel: '',
    otherLang: '',
    otherLangLevel: '',
    computerLevel: '',
    emailSkill: '',
    designSkill: '',
    contentCreatorSkill: '',
    additionalSkills: '', 
    wantedServices: [] as string[],
    otherService: '',
    
    jobType: '',
    targetOccupation: '',
    otherOccupation: '',
    targetPositionLevel: '',
    expectedSalaryRange: '',
    targetWorkProvince: '',
    jobSearchChannels: [] as string[],
    otherJobSource: '',
    cvFile: null as File | null,
    portfolioLink: '',

    internPurpose: '',
    internStartDate: '',
    internEndDate: '',
    internDaysPerWeek: '',
    internFormat: '',
    internCompanyType: '',
    internSpecialInterest: '',
    internExpectation: '',
    internMotivation: '',

    trainingTopic: '',
    trainingReason: '',

    disseminationSource: '',
    disseminationTopicInterested: '',
    disseminationReason: '',
    disseminationExpectation: '',

    volunteerStrengths: '',
    volunteerWeaknesses: '',
    volunteerSpecialSkills: '',
    volunteerMotivationJAO: '',
    volunteerExperience: '',
    volunteerOpinionCounseling: '',
    volunteerExpectation: '',
    volunteerTeam: '',
    volunteerDaysPerWeek: '',
    volunteerDaysPerWeekOther: '',
    volunteerAvailableDays: '',
    emergencyContactName: '',
    emergencyContactPhone: '',

    counselingCurrentState: '',
    counselingPersonality: [] as string[],
    counselingOtherPersonality: '',
    counselingWorkPreference: '',
    counselingWorkplace: [] as string[],
    counselingOtherWorkplace: '',
    counselingSuitableJobs: [] as string[],
    counselingOtherSuitableJob: '',
    counselingDate: ''
  });

  // Client-side initialization to prevent SSR Hydration mismatch
  useEffect(() => {
    setFormData((prev: any) => ({
      ...prev,
      timestamp: new Date().toLocaleString('lo-LA')
    }));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'birthProvince') {
      setFormData((prev: any) => ({ ...prev, [name]: value, birthDistrict: '' }));
    } else if (name === 'currentProvince') {
      setFormData((prev: any) => ({ ...prev, [name]: value, currentDistrict: '' }));
    } else if (name === 'participationMode') {
      setFormData((prev: any) => ({
        ...prev,
        participationMode: value,
        location: value === 'ອອນລາຍ' ? '' : prev.location,
        onlineChannel: value === 'ມາດ້ວຍຕົນເອງ' ? '' : prev.onlineChannel,
        onlineChannelOther: value === 'ມາດ້ວຍຕົນເອງ' ? '' : prev.onlineChannelOther
      }));
    } else if (name === 'onlineChannel') {
      setFormData((prev: any) => ({
        ...prev,
        onlineChannel: value,
        onlineChannelOther: value === 'ອື່ນໆ' ? prev.onlineChannelOther : ''
      }));
    } else {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("ຂະໜາດໄຟລ໌ຕ້ອງບໍ່ເກີນ 5MB");
        return;
      }
      setFormData((prev: any) => ({ ...prev, cvFile: file }));
    }
  };

  const handleCheckboxChange = (serviceValue: string) => {
    setFormData((prev: any) => {
      const services = prev.wantedServices.includes(serviceValue)
        ? prev.wantedServices.filter((s: string) => s !== serviceValue)
        : [...prev.wantedServices, serviceValue];
      return { ...prev, wantedServices: services };
    });
  };

  const handleJobChannelChange = (channel: string) => {
    setFormData((prev: any) => {
      const channels = prev.jobSearchChannels.includes(channel)
        ? prev.jobSearchChannels.filter((c: string) => c !== channel)
        : [...prev.jobSearchChannels, channel];
      return { ...prev, jobSearchChannels: channels };
    });
  };

  const handleCounselingArrayChange = (field: string, item: string) => {
    setFormData((prev: any) => {
      const currentArray = prev[field] || [];
      const newArray = currentArray.includes(item)
        ? currentArray.filter((i: string) => i !== item)
        : [...currentArray, item];
      
      // Enforce the strict maximum limit of 3 options for suitable jobs
      if (field === 'counselingSuitableJobs' && newArray.length > 3 && !currentArray.includes(item)) {
         return prev; 
      }
      return { ...prev, [field]: newArray };
    });
  };

  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result.split(',')[1]);
        } else {
          reject(new Error('Failed reading file data.'));
        }
      };
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitError("");
    
    try {
      const submitData = { ...formData };
      
      if (formData.participationMode === 'ອອນລາຍ') {
        const resolvedOnlineChannel = formData.onlineChannel === 'ອື່ນໆ'
          ? (formData.onlineChannelOther?.trim() || 'ອື່ນໆ')
          : formData.onlineChannel;
        submitData.onlineChannel = resolvedOnlineChannel;
        submitData.location = resolvedOnlineChannel ? `ອອນລາຍ (${resolvedOnlineChannel})` : 'ອອນລາຍ';
      } else {
        submitData.onlineChannel = '';
      }
      delete submitData.onlineChannelOther;

      if (submitData.cvFile instanceof window.File) {
        const base64Data = await readFileAsBase64(submitData.cvFile);
        submitData.cvFile = {
          name: submitData.cvFile.name,
          type: submitData.cvFile.type,
          data: base64Data
        };
      }

      // Format custom multi-select arrays to make them easy to read on the backend
      submitData.formattedWantedServices = formData.wantedServices.join(', ');
      submitData.formattedJobSearchChannels = formData.jobSearchChannels.join(', ');
      submitData.formattedCounselingPersonality = formData.counselingPersonality.join(', ');
      submitData.formattedCounselingWorkplace = formData.counselingWorkplace.join(', ');
      submitData.formattedCounselingSuitableJobs = formData.counselingSuitableJobs.join(', ');
      
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', 
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(submitData)
      });
      
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Submission failed", error);
      setSubmitError("ເກີດຂໍ́ຜິດພາດໃນການເຊື່ອມຕໍ່ກັບເຊີເວີ ກະລຸນາກວດສອບການເຊື່ອມຕໍ່ອິນເຕີເນັດ ແລ້ວລອງໃໝ່ອີກຄັ້ງ");
    } finally {
      setIsLoading(false);
    }
  };

  const showJobFields = formData.wantedServices.includes('ສະໝັກງານ') || formData.wantedServices.includes('ຝາກປະຫວັດການເຮັດວຽກ ຫຼື CV');
  const showInternFields = formData.wantedServices.includes('ຝຶກງານ');
  const showTrainingFields = formData.wantedServices.includes('ຝຶກອົບຮົມທັກສະຕ່າງໆ') || formData.wantedServices.includes('ຝຶກອົບຮົມທັກສະການກຽມຄວາມພ້ອມກ່ອນສະໝັກງານ');
  const showVolunteerFields = formData.wantedServices.includes('ວຽກຈິດອາສາ');
  const showCounselingFields = formData.wantedServices.includes('ປຶກສາເລື່ອງສາຍອາຊີບ');
  const showDisseminationFields = formData.wantedServices.includes('ເຂົ້າຮ່ວມກິດຈະກຳເຜີຍແຜ່');

  // Safely mapped color configurations as full static strings for Tailwind CSS v4 compiler.
  const renderPortfolioUploadSection = (accentColor: "blue" | "emerald" | "sky" | "violet" = "blue") => {
    const isEmerald = accentColor === "emerald";
    const isSky = accentColor === "sky";
    const isViolet = accentColor === "violet";
    
    let textClass = "text-blue-600";
    let hoverTextClass = "group-hover:text-blue-600";
    let hoverBorderClass = "group-hover:border-blue-400";
    let ringFocusClass = "focus:ring-blue-500/10";
    
    if (isEmerald) {
      textClass = "text-emerald-600";
      hoverTextClass = "group-hover:text-emerald-600";
      hoverBorderClass = "group-hover:border-emerald-400";
      ringFocusClass = "focus:ring-emerald-500/10";
    } else if (isSky) {
      textClass = "text-sky-600";
      hoverTextClass = "group-hover:text-sky-600";
      hoverBorderClass = "group-hover:border-sky-400";
      ringFocusClass = "focus:ring-sky-500/10";
    } else if (isViolet) {
      textClass = "text-violet-600";
      hoverTextClass = "group-hover:text-violet-600";
      hoverBorderClass = "group-hover:border-violet-400";
      ringFocusClass = "focus:ring-violet-500/10";
    }

    return (
      <div className="md:col-span-2 space-y-6 bg-slate-50/50 p-6 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-2">
          <FileText size={20} className={textClass} />
          <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">ເອກະສານປະກອບ (Portfolio / Resume / CV)</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
              <FileUp size={14} /> ອັບໂຫຼດໄຟລ໌ (PDF/DOC)
            </label>
            <div className="relative group h-32">
              <input 
                type="file" 
                name="cvFile" 
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
              />
              <div className={`p-4 border-2 border-dashed rounded-xl h-full transition-all flex flex-col items-center justify-center gap-2 ${formData.cvFile ? 'border-green-400 bg-green-50/30' : `border-slate-200 bg-white ${hoverBorderClass}`}`}>
                {formData.cvFile ? (
                  <>
                    <CheckCircle2 className="text-green-600" size={24} />
                    <span className="text-xs font-bold text-green-700 text-center truncate max-w-full px-2">
                      {formData.cvFile.name}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {(formData.cvFile.size / (1024 * 1024)).toFixed(2)} MB • ປ່ຽນໄຟລ໌
                    </span>
                  </>
                ) : (
                  <>
                    <Upload className={`text-slate-400 ${hoverTextClass}`} size={24} />
                    <span className={`text-[12px] font-bold text-slate-600 ${hoverTextClass} text-center`}>
                      ກົດ ຫຼື ລາກເພື່ອເລືອກໄຟລ໌
                    </span>
                    <span className="text-[10px] text-slate-400">PDF, DOC, DOCX ບໍ່ເກີນ 5MB</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
              <LinkIcon size={14} /> ຫຼື ແປະລິ້ງຜົນງານອອນລາຍ
            </label>
            <div className="space-y-3">
              <div className="relative">
                <input 
                  type="text" 
                  name="portfolioLink" 
                  value={formData.portfolioLink} 
                  onChange={handleInputChange}
                  placeholder="https://drive.google.com/..."
                  className={`w-full p-3.5 pl-10 border border-slate-200 rounded-xl bg-white text-sm focus:ring-4 focus:border-blue-500 outline-none ${ringFocusClass} transition-all`}
                />
                <ExternalLink size={16} className="absolute left-3.5 top-4 text-slate-400" />
              </div>
              <p className="text-[11px] text-slate-400 italic">
                * ກະລຸນາກວດສອບການຕັ້ງຄ່າການເຂົ້າເຖິງໄຟລ໌ໃຫ້ເປັນ "ທຸກຄົນທີ່ມີລິ້ງ (Anyone with the link)"
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border border-slate-100 animate-in fade-in zoom-in duration-500">
          <div className="bg-emerald-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <CheckCircle2 className="w-12 h-12 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">ສົ່ງຂໍ້ມູນສຳເລັດແລ້ວ!</h2>
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">
            ຂໍຂອບໃຈສຳລັບການລົງທະບຽນ ຂໍ້ມູນຄວາມຕ້ອງການຂອງທ່ານໄດ້ຮັບການບັນທຶກເຂົ້າສູ່ລະບົບຮຽບຮ້ອຍແລ້ວ
          </p>
          <button 
            type="button"
            onClick={() => {
              setIsSubmitted(false);
              setFormData((prev: any) => ({
                ...prev,
                participationMode: '',
                location: '',
                onlineChannel: '',
                onlineChannelOther: '',
                wantedServices: [],
                cvFile: null,
                portfolioLink: '',
                phone: '',
                firstName: '',
                lastName: ''
              }));
            }} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md active:scale-95"
          >
            ກັບຄືນໄປໜ້າແບບຟອມ
          </button>
        </div>
      </div>
    );
  }

  const isAttendanceInfoComplete =
    (formData.participationMode === 'ມາດ້ວຍຕົນເອງ' && Boolean(formData.location?.trim())) ||
    (formData.participationMode === 'ອອນລາຍ' &&
      Boolean(formData.onlineChannel?.trim()) &&
      (formData.onlineChannel !== 'ອື່ນໆ' || Boolean(formData.onlineChannelOther?.trim())));

  const getFormProgress = () => {
    let score = 0;
    const total = 12;
    if (isAttendanceInfoComplete) score++;
    if (formData.status && formData.status.trim()) score++;
    if (formData.visitType && formData.visitType.trim()) score++;
    if (formData.firstName && formData.firstName.trim()) score++;
    if (formData.lastName && formData.lastName.trim()) score++;
    if (formData.age && String(formData.age).trim()) score++;
    if (formData.gender && formData.gender.trim()) score++;
    if (formData.currentProvince && formData.currentProvince.trim()) score++;
    if (formData.currentDistrict && formData.currentDistrict.trim()) score++;
    if (formData.currentVillage && formData.currentVillage.trim()) score++;
    if (formData.phone && formData.phone.trim()) score++;
    if (formData.wantedServices && formData.wantedServices.length > 0) score++;
    return Math.round((score / total) * 100);
  };

  const displayName = (formData.firstName || formData.lastName) 
    ? `${formData.firstName} ${formData.lastName}`.trim() 
    : "ຜູ້ຮັບບໍລິການ";

  const progressValue = getFormProgress();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col overflow-x-hidden">
      {/* HEADER SECTION FROM DESIGN HTML */}
      <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 md:px-10 shrink-0 sticky top-0 z-[100] shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
            </svg>
          </div>
          <div>
            <h1 className="text-base md:text-lg font-bold tracking-tight text-slate-900 leading-none">JAO Registration</h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase mt-1 tracking-wider">Career Services Hub</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-xs md:text-sm font-semibold text-slate-600 select-none">System Ready</span>
          </div>
          <div className="h-8 w-[1px] bg-slate-200 hidden md:block"></div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-900 truncate max-w-[120px]">{displayName}</p>
              <p className="text-[10px] text-slate-400 font-bold">CANDIDATE ID: #4402</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border-2 border-white shadow-xs font-bold text-xs text-slate-600">
              {formData.firstName ? formData.firstName.substring(0, 2) : "JS"}
            </div>
          </div>
        </div>
      </header>

      {/* CORE WORKFLOW AREA */}
      <div className="flex flex-1">
        {/* ASIDE BAR WITH INTERACTIVE PROCESS PROGRESS */}
        <aside className="w-72 bg-slate-900 p-8 hidden lg:flex flex-col shrink-0 text-slate-400 self-stretch border-r border-slate-800">
          <nav className="space-y-1 text-slate-400 flex-1">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-slate-500">Registration Workflow</p>
            
            <div className={`flex items-center gap-4 p-3 rounded-xl transition-all ${formData.wantedServices.length > 0 ? 'bg-slate-800/50 text-slate-300' : 'bg-indigo-600 text-white shadow-lg'}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${formData.wantedServices.length > 0 ? 'bg-indigo-500/20 text-indigo-400' : 'bg-white/20 text-white'}`}>01</div>
              <span className="text-xs font-bold tracking-wide">ເລືອກບໍລິການ</span>
            </div>

            <div className={`flex items-center gap-4 p-3 rounded-xl transition-all ${isAttendanceInfoComplete ? 'bg-slate-800/50 text-slate-300' : (formData.wantedServices.length > 0 ? 'bg-indigo-600 text-white shadow-lg' : 'opacity-50')}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${isAttendanceInfoComplete ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800 text-slate-400'}`}>02</div>
              <span className="text-xs font-bold tracking-wide">ຂໍ້ມູນການເຂົ້າຮ່ວມ</span>
            </div>

            <div className={`flex items-center gap-4 p-3 rounded-xl transition-all ${formData.firstName ? 'bg-slate-800/50 text-slate-300' : (isAttendanceInfoComplete ? 'bg-indigo-600 text-white shadow-lg' : 'opacity-50')}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${formData.firstName ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800 text-slate-400'}`}>03</div>
              <span className="text-xs font-bold tracking-wide">ປະຫວັດສ່ວນຕົວ</span>
            </div>

            <div className={`flex items-center gap-4 p-3 rounded-xl transition-all ${isSubmitted ? 'bg-slate-800/50 text-slate-300' : (formData.firstName ? 'bg-indigo-600 text-white shadow-lg' : 'opacity-50')}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${isSubmitted ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800 text-slate-400'}`}>04</div>
              <span className="text-xs font-bold tracking-wide">ຢືນຢັນຂໍ້ມູນ</span>
            </div>
          </nav>

          <div className="mt-auto p-5 bg-slate-800/50 rounded-2xl border border-slate-800">
            <p className="text-[11px] font-bold text-slate-300">Form Completion</p>
            <div className="w-full h-2 bg-slate-700 rounded-full mt-3 overflow-hidden">
              <div 
                className="h-full bg-indigo-500 transition-all duration-500" 
                style={{ width: `${progressValue}%` }}
              ></div>
            </div>
            <p className="text-[10px] text-slate-500 mt-2 font-bold uppercase">{progressValue}% Verified</p>
          </div>
        </aside>

        {/* WORKSPACE FORM CONTENT */}
        <main className="flex-1 overflow-y-auto py-10 px-4 md:px-10 bg-slate-50">
          <div className="max-w-4xl mx-auto space-y-10">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-6 gap-4">
              <div className="space-y-1">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Basic Information</h2>
                <p className="text-xs md:text-sm text-slate-500 font-medium">Please provide your current legal details and contact info.</p>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase">Section 1/5</span>
                <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-[10px] font-black uppercase tracking-wider">* Required</span>
              </div>
            </div>

            {submitError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 text-red-700 text-sm">
                <AlertCircle className="shrink-0 mt-0.5" size={18} />
                <div>
                  <span className="font-bold">ເກີດຂໍ້ຜິດພາດ: </span>
                  {submitError}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8 pb-20">
          
          {/* SECTION 1 - Wanted Services */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden transform hover:shadow-md transition-shadow">
            <div className="bg-blue-600 px-6 py-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <Heart className="text-blue-100 shrink-0" size={24} />
                <h2 className="text-lg font-bold tracking-tight">1. ທ່ານຕ້ອງການໃຊ້ບໍລິການດ້ານໃດຈາກພວກເຮົາ? <span className="text-red-300">*</span></h2>
              </div>
              <span className="text-[10px] font-black text-blue-100 uppercase tracking-wider bg-blue-700/60 px-3 py-1 rounded-full w-fit">
                ເລືອກໄດ້ຫຼາຍຂໍ້
              </span>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {serviceOptions.map((option, idx) => {
                  const isSelected = formData.wantedServices.includes(option.value);
                  return (
                    <label 
                      key={`service-${option.value}-${idx}`} 
                      className={`flex items-start gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer font-bold leading-tight select-none ${isSelected ? 'bg-blue-50/50 border-blue-600 text-blue-900' : 'bg-white border-slate-100 text-slate-700 hover:border-slate-300'}`}
                    >
                      <input 
                        type="checkbox" 
                        required={formData.wantedServices.length === 0}
                        checked={isSelected} 
                        onChange={() => handleCheckboxChange(option.value)} 
                        className="sr-only" 
                      />
                      <div className={`mt-0.5 shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-350 bg-white'}`}>
                        {isSelected && <CheckCircle2 size={12} className="stroke-[3]" />}
                      </div>
                      <span className="text-sm">{option.label}</span>
                    </label>
                  );
                })}
              </div>
              
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Info size={14} className="text-blue-500" /> ຄວາມຕ້ອງການອື່ນໆເພີ່ມເຕີມ (ຖ້າມີ)
                </label>
                <input 
                  type="text" 
                  name="otherService" 
                  value={formData.otherService} 
                  onChange={handleInputChange} 
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all text-sm font-medium" 
                  placeholder="ລະບຸຄວາມຕ້ອງການເພີ່ມເຕີມຂອງທ່ານ..." 
                />
              </div>
            </div>
          </div>

          {/* SECTION 2 - Visit Details */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 px-6 py-4.5 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="text-blue-400 shrink-0" size={20} />
                <h2 className="text-base font-bold">2. ຂໍ້ມູນການເຂົ້າໃຊ້ບໍລິການ</h2>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">ພາກທີ 2</span>
            </div>
            
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-2">
                  <Clock size={14} className="text-slate-400" /> ວັນແລະເວລາທີ່ລົງທະບຽນ
                </label>
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 text-sm font-medium select-none">
                  {formData.timestamp || 'ກຳລັງໂຫຼດເວລາ...'}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  ຮູບແບບການເຂົ້າຮ່ວມບໍລິການ <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className={`flex items-center gap-2.5 p-3.5 rounded-xl border-2 cursor-pointer transition-all select-none ${formData.participationMode === 'ມາດ້ວຍຕົນເອງ' ? 'bg-blue-50/70 border-blue-600 text-blue-900' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}>
                    <input
                      type="radio"
                      name="participationMode"
                      value="ມາດ້ວຍຕົນເອງ"
                      required
                      checked={formData.participationMode === 'ມາດ້ວຍຕົນເອງ'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <MapPin size={16} className={formData.participationMode === 'ມາດ້ວຍຕົນເອງ' ? 'text-blue-600 shrink-0' : 'text-slate-400 shrink-0'} />
                    <span className="text-sm font-bold">ມາສະຖານທີ່ຈິງ</span>
                  </label>

                  <label className={`flex items-center gap-2.5 p-3.5 rounded-xl border-2 cursor-pointer transition-all select-none ${formData.participationMode === 'ອອນລາຍ' ? 'bg-blue-50/70 border-blue-600 text-blue-900' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}>
                    <input
                      type="radio"
                      name="participationMode"
                      value="ອອນລາຍ"
                      checked={formData.participationMode === 'ອອນລາຍ'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <Monitor size={16} className={formData.participationMode === 'ອອນລາຍ' ? 'text-blue-600 shrink-0' : 'text-slate-400 shrink-0'} />
                    <span className="text-sm font-bold">ທາງອອນລາຍ</span>
                  </label>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {formData.participationMode === 'ມາດ້ວຍຕົນເອງ' && (
                  <motion.div
                    key="participation-onsite"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:col-span-2 space-y-2 p-5 bg-slate-50 rounded-2xl border border-slate-200/70 overflow-hidden"
                  >
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide flex items-center gap-1.5">
                      <MapPin size={14} className="text-blue-600" /> ສະຖານທີ່ເຂົ້າຮ່ວມ ຫຼື ສາຂາ <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      name="location" 
                      required={formData.participationMode === 'ມາດ້ວຍຕົນເອງ'}
                      value={formData.location} 
                      onChange={handleInputChange} 
                      placeholder="ເຊັ່ນ: ຫ້ອງການສາຂາວຽງຈັນ, ມະຫາວິທະຍາໄລແຫ່ງຊາດ, ງານວາງສະແດງອາຊີບ..." 
                      className="w-full p-3.5 border border-slate-200 rounded-xl bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-sm font-medium transition-all" 
                    />
                  </motion.div>
                )}

                {formData.participationMode === 'ອອນລາຍ' && (
                  <motion.div
                    key="participation-online"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 p-5 bg-blue-50/50 rounded-2xl border border-blue-100/60 overflow-hidden"
                  >
                    <div className={`space-y-2 ${formData.onlineChannel === 'ອື່ນໆ' ? '' : 'md:col-span-2'}`}>
                      <label className="text-xs font-bold text-blue-900 uppercase tracking-wide flex items-center gap-1.5">
                        <Monitor size={14} className="text-blue-600" /> ເຂົ້າຮ່ວມຜ່ານຊ່ອງທາງໃດ? <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="onlineChannel"
                        required={formData.participationMode === 'ອອນລາຍ'}
                        value={formData.onlineChannel}
                        onChange={handleInputChange}
                        className="w-full p-3.5 border border-slate-200 rounded-xl bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-sm font-medium transition-all"
                      >
                        <option value="">-- ກະລຸນາເລືອກຊ່ອງທາງອອນລາຍ --</option>
                        <option value="Facebook Page / Messenger">Facebook Page / Messenger</option>
                        <option value="WhatsApp">WhatsApp</option>
                        <option value="Zoom / Google Meet">Zoom / Google Meet</option>
                        <option value="TikTok">TikTok</option>
                        <option value="ໂທລະສັບ">ໂທລະສັບ (Phone Call)</option>
                        <option value="ເວັບໄຊ / ແບບຟອມອອນລາຍ">ເວັບໄຊ / ແບບຟອມອອນລາຍ</option>
                        <option value="ອື່ນໆ">ອື່ນໆ (ລະບຸຊ່ອງທາງ)</option>
                      </select>
                    </div>

                    {formData.onlineChannel === 'ອື່ນໆ' && (
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-blue-900 uppercase tracking-wide">
                          ລະບຸຊ່ອງທາງອອນລາຍ <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="onlineChannelOther"
                          required={formData.participationMode === 'ອອນລາຍ' && formData.onlineChannel === 'ອື່ນໆ'}
                          value={formData.onlineChannelOther}
                          onChange={handleInputChange}
                          placeholder="ເຊັ່ນ: YouTube, Instagram, Telegram..."
                          className="w-full p-3.5 border border-slate-200 rounded-xl bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-sm font-medium transition-all"
                        />
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  ສະຖານະປະຈຸບັນຂອງທ່ານ <span className="text-red-500">*</span>
                </label>
                <select 
                  name="status" 
                  required 
                  value={formData.status} 
                  onChange={handleInputChange} 
                  className="w-full p-3.5 border border-slate-200 rounded-xl bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-sm font-medium transition-all"
                >
                  <option value="">-- ກະລຸນາເລືອກສະຖານະ --</option>
                  <option value="student">ນັກຮຽນ (ມັດທະຍົມ / ວິຊາຊີບພື້ນຖານ)</option>
                  <option value="university">ນັກສຶກສາ (ມະຫາວິທະຍາໄລ / ວິຊາຊີບຊັ້ນສູງ)</option>
                  <option value="employee">ພະນັກງານທົ່ວໄປ / ຜູ້ຈົບການສຶກສາແລ້ວ</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  ປະເພດການເຂົ້າຮ່ວມ <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-6 h-[48px] px-2">
                  <label className="flex items-center gap-2.5 cursor-pointer group select-none">
                    <input 
                      type="radio" 
                      name="visitType" 
                      value="first" 
                      required 
                      checked={formData.visitType === 'first'} 
                      onChange={handleInputChange} 
                      className="w-5 h-5 border-slate-300 text-blue-600 focus:ring-blue-500" 
                    />
                    <span className="text-sm font-semibold text-slate-600 group-hover:text-blue-600 transition-colors">
                      ຄັ້ງທຳອິດ
                    </span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer group select-none">
                    <input 
                      type="radio" 
                      name="visitType" 
                      value="returning" 
                      checked={formData.visitType === 'returning'} 
                      onChange={handleInputChange} 
                      className="w-5 h-5 border-slate-300 text-blue-600 focus:ring-blue-500" 
                    />
                    <span className="text-sm font-semibold text-slate-600 group-hover:text-blue-600 transition-colors">
                      ເຄີຍມາໃຊ້ບໍລິການແລ້ວ
                    </span>
                  </label>
                </div>
              </div>

              <AnimatePresence>
                {formData.visitType === 'returning' && (
                  <motion.div 
                    key="visit-returning-details"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 p-5 bg-blue-50/50 rounded-2xl border border-blue-100/50 overflow-hidden"
                  >
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-blue-800 uppercase tracking-wide">
                        ມາໃຊ້ບໍລິການຄັ້ງນີ້ເປັນຄັ້ງຫຼ້າສຸດ ຄັ້ງທີເທົ່າໃດ?
                      </label>
                      <input 
                        type="number" 
                        name="visitCount" 
                        value={formData.visitCount} 
                        onChange={handleInputChange} 
                        placeholder="ລະບຸຕົວເລກ" 
                        className="w-full p-3 border border-slate-200 rounded-xl bg-white focus:ring-4 focus:ring-blue-500/10 outline-none text-sm font-medium" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-blue-800 uppercase tracking-wide">
                        ຫ່າງຈາກຄັ້ງກ່ອນໜ້າເປັນເວລາດົນປານໃດ?
                      </label>
                      <input 
                        type="text" 
                        name="timeSinceLastVisit" 
                        value={formData.timeSinceLastVisit} 
                        onChange={handleInputChange} 
                        placeholder="ເຊັ່ນ 2 ອາທິດ ຫຼື 3 ເດືອນ" 
                        className="w-full p-3 border border-slate-200 rounded-xl bg-white focus:ring-4 focus:ring-blue-500/10 outline-none text-sm font-medium" 
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* SECTION 3 - Personal History */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-indigo-600 px-6 py-4.5 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <User className="text-indigo-200 shrink-0" size={20} />
                <h2 className="text-base font-bold">3. ປະຫວັດສ່ວນຕົວ ແລະ ການຕິດຕໍ່</h2>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-indigo-300 font-bold">ພາກທີ 3</span>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    ຊື່ <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="firstName" 
                    required 
                    value={formData.firstName} 
                    onChange={handleInputChange} 
                    className="w-full p-3.5 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 outline-none text-sm font-medium transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    ນາມສະກຸນ <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="lastName" 
                    required 
                    value={formData.lastName} 
                    onChange={handleInputChange} 
                    className="w-full p-3.5 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 outline-none text-sm font-medium transition-all" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                      ອາຍຸ (ປີ) <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="number" 
                      name="age" 
                      required 
                      value={formData.age} 
                      onChange={handleInputChange} 
                      className="w-full p-3.5 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 outline-none text-sm font-medium transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                      ເພດ <span className="text-red-500">*</span>
                    </label>
                    <select 
                      name="gender" 
                      required 
                      value={formData.gender} 
                      onChange={handleInputChange} 
                      className="w-full p-3.5 border border-slate-200 rounded-xl bg-white focus:ring-4 focus:ring-indigo-500/10 outline-none text-sm font-medium transition-all"
                    >
                      <option value="">ເລືອກເພດ</option>
                      <option value="male">ຊາຍ (Male)</option>
                      <option value="female">ຍິງ (Female)</option>
                      <option value="lgbtqia2+">LGBTQIA2+</option>
                      <option value="other">ບໍ່ລະບຸ / ອື່ນໆ</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Conditional sections for First Visit Profile details */}
              <AnimatePresence>
                {formData.visitType === 'first' && (
                  <motion.div 
                    key="first-visit-profile-details"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-6 pt-4 overflow-hidden border-t border-slate-100"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                          ວັນເດືອນປີເກີດ
                        </label>
                        <input 
                          type="date" 
                          name="dob" 
                          value={formData.dob} 
                          onChange={handleInputChange} 
                          className="w-full p-3.5 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 outline-none text-sm font-medium transition-all" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                          ຊົນເຜົ່າ
                        </label>
                        <input 
                          type="text" 
                          name="ethnicity" 
                          value={formData.ethnicity} 
                          onChange={handleInputChange} 
                          placeholder="ເຊັ່ນ: ລາວລຸ່ມ, ມົ້ງ, ກຶມມຸ..." 
                          className="w-full p-3.5 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 outline-none text-sm font-medium transition-all" 
                        />
                      </div>
                    </div>

                    <div className="p-5 bg-slate-50/50 rounded-2xl border border-slate-200/60 space-y-4">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <MapPin size={13} className="text-indigo-400" /> ສະຖານທີ່ເກີດຕາມທະບຽນສຳມະໂນຄົວ
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-500">ແຂວງ</label>
                          <select 
                            name="birthProvince" 
                            value={formData.birthProvince} 
                            onChange={handleInputChange} 
                            className="w-full p-2.5 border border-slate-200 bg-white rounded-xl text-xs font-semibold"
                          >
                            <option value="">ເລືອກແຂວງ</option>
                            {Object.keys(geoData).map((p, idx) => <option key={`bp-${p}-${idx}`} value={p}>{p}</option>)}
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-500">ເມືອງ</label>
                          <select 
                            name="birthDistrict" 
                            value={formData.birthDistrict} 
                            onChange={handleInputChange} 
                            disabled={!formData.birthProvince}
                            className="w-full p-2.5 border border-slate-200 bg-white rounded-xl text-xs font-semibold disabled:bg-slate-100 disabled:text-slate-400"
                          >
                            <option value="">ເລືອກເມືອງ</option>
                            {formData.birthProvince && geoData[formData.birthProvince]?.map((d: string, idx: number) => (
                              <option key={`bd-${d}-${idx}`} value={d}>{d}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-500">ບ້ານ</label>
                          <input 
                            type="text" 
                            name="birthVillage" 
                            value={formData.birthVillage} 
                            onChange={handleInputChange} 
                            placeholder="ລະບຸບ້ານ" 
                            className="w-full p-2.5 border border-slate-200 rounded-xl text-xs font-semibold bg-white" 
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Current Address Group */}
              <div className="space-y-6 border-t border-slate-100 pt-6">
                <div className="p-5 bg-indigo-50/20 rounded-2xl border border-indigo-100/40 space-y-4">
                  <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                    <MapPin size={13} /> ຂໍ້ມູນທີ່ຢູ່ປະຈຸບັນ
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500">ແຂວງປະຈຸບັນ <span className="text-red-500">*</span></label>
                      <select 
                        name="currentProvince" 
                        required
                        value={formData.currentProvince} 
                        onChange={handleInputChange} 
                        className="w-full p-2.5 border border-slate-200 bg-white rounded-xl text-xs font-semibold"
                      >
                        <option value="">ເລືອກແຂວງ</option>
                        {Object.keys(geoData).map((p, idx) => <option key={`cp-${p}-${idx}`} value={p}>{p}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500">ເມືອງປະຈຸບັນ <span className="text-red-500">*</span></label>
                      <select 
                        name="currentDistrict" 
                        required
                        value={formData.currentDistrict} 
                        onChange={handleInputChange} 
                        disabled={!formData.currentProvince}
                        className="w-full p-2.5 border border-slate-200 bg-white rounded-xl text-xs font-semibold disabled:bg-slate-100 disabled:text-slate-400"
                      >
                        <option value="">ເລືອກເມືອງ</option>
                        {formData.currentProvince && geoData[formData.currentProvince]?.map((d: string, idx: number) => (
                          <option key={`cd-${d}-${idx}`} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500">ບ້ານປະຈຸບັນ <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        name="currentVillage" 
                        required
                        value={formData.currentVillage} 
                        onChange={handleInputChange} 
                        placeholder="ລະບຸບ້ານ" 
                        className="w-full p-2.5 border border-slate-200 rounded-xl text-xs font-semibold" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                      ປະຈຸບັນອາໄສຢູ່ກັບໃຜ?
                    </label>
                    <input 
                      type="text" 
                      name="livingWith" 
                      value={formData.livingWith} 
                      onChange={handleInputChange} 
                      placeholder="ເຊັ່ນ: ພໍ່ແມ່, ອາໄສຢູ່ກັບໝູ່, ພີ່ນ້ອງ, ຫໍພັກ..." 
                      className="w-full p-3.5 border border-slate-200 rounded-xl text-sm font-medium focus:ring-4 focus:ring-indigo-500/10 outline-none" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
                      <Phone size={13} className="text-indigo-500" /> ເບີໂທລະສັບ (WhatsApp) <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="tel" 
                      name="phone" 
                      required
                      value={formData.phone} 
                      onChange={handleInputChange} 
                      placeholder="ເຊັ່ນ: 020 9XXXXXXX" 
                      className="w-full p-3.5 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 outline-none text-sm font-medium" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
                      <Mail size={13} className="text-indigo-500" /> Email 
                    </label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      placeholder="username@gmail.com" 
                      className="w-full p-3.5 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 outline-none text-sm font-medium" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
                      <Facebook size={13} className="text-indigo-500" /> Facebook Profile / Name
                    </label>
                    <input 
                      type="text" 
                      name="facebook" 
                      value={formData.facebook} 
                      onChange={handleInputChange} 
                      placeholder="ລິ້ງ ຫຼື ຊື່ເຟສບຸກ" 
                      className="w-full p-3.5 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 outline-none text-sm font-medium" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 4 - Dynamic Education / Career based on Status */}
          <AnimatePresence mode="wait">
            {formData.status && (
              <motion.div 
                key={formData.status}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden"
              >
                <div className="bg-slate-800 px-6 py-4.5 text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="text-yellow-400 shrink-0" size={20} />
                    <h2 className="text-base font-bold">
                      {formData.status === 'student' ? '4. ຂໍ້ມູນການສຶກສາ (ມັດທະຍົມ)' : 
                       formData.status === 'university' ? '4. ຂໍ້ມູນການສຶກສາ (ມະຫາວິທະຍາໄລ)' : 
                       '4. ຂໍ້ມູນປະຫວັດການສຶກສາ ແລະ ປະສົບການເຮັດວຽກ'}
                    </h2>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">ພາກທີ 4</span>
                </div>

                <div className="p-6 md:p-8 space-y-6">
                  {formData.status === 'student' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500">ປະຈຸບັນກຳລັງສຶກສາຢູ່ສະຖາບັນ/ໂຮງຮຽນໃດ? <span className="text-red-500">*</span></label>
                        <input type="text" name="studyAt" required value={formData.studyAt} onChange={handleInputChange} placeholder="ລະບຸຊື່ໂຮງຮຽນ" className="w-full p-3.5 border border-slate-200 rounded-xl text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500">ຊັ້ນຮຽນປະຈຸບັນ <span className="text-red-500">*</span></label>
                        <select name="gradeLevel" required value={formData.gradeLevel} onChange={handleInputChange} className="w-full p-3.5 border border-slate-200 rounded-xl bg-white text-sm">
                          <option value="">ເລືອກຊັ້ນຮຽນ</option>
                          <option value="ມ.4">ມ.4</option>
                          <option value="ມ.5">ມ.5</option>
                          <option value="ມ.6">ມ.6</option>
                          <option value="ມ.7">ມ.7</option>
                          <option value="ວິຊາຊີບຂັ້ນຕົ້ນ">ວິຊາຊີບຂັ້ນຕົ້ນ</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500">ສະຖານທີ່ຕ້ອງການສຶກສາຕໍ່ໃນອະນາຄົດ</label>
                        <input type="text" name="studyDestination" value={formData.studyDestination} onChange={handleInputChange} placeholder="ເຊັ່ນ: ມຊ, ສະຖາບັນ, ຮຽນຕໍ່ຕ່າງປະເທດ..." className="w-full p-3.5 border border-slate-200 rounded-xl text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500">ສາຂາ ຫຼື ຄະນະທີ່ສົນໃຈຢາກຮຽນ</label>
                        <input type="text" name="interestedFaculty" value={formData.interestedFaculty} onChange={handleInputChange} placeholder="ເຊັ່ນ: ບໍລິຫານ, ໄອທີ, ພາສາອັງກິດ..." className="w-full p-3.5 border border-slate-200 rounded-xl text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500">ເກຣດສະເລ່ຍສະສົມ (GPA Latest)</label>
                        <input type="text" name="gpa" value={formData.gpa} onChange={handleInputChange} placeholder="ເຊັ່ນ: 3.50" className="w-full p-3.5 border border-slate-200 rounded-xl text-sm" />
                      </div>
                    </div>
                  )}

                  {formData.status === 'university' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500">ມະຫາວິທະຍາໄລ / ສະຖາບັນທີ່ກຳລັງສຶກສາ <span className="text-red-500">*</span></label>
                        <input type="text" name="studyAt" required value={formData.studyAt} onChange={handleInputChange} placeholder="ເຊັ່ນ: ມະຫາວິທະຍາໄລແຫ່ງຊາດ" className="w-full p-3.5 border border-slate-200 rounded-xl text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500">ຄະນະ <span className="text-red-500">*</span></label>
                        <input type="text" name="faculty" required value={formData.faculty} onChange={handleInputChange} placeholder="ເຊັ່ນ: ຄະນະວິສະວະກຳສາດ" className="w-full p-3.5 border border-slate-200 rounded-xl text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500">ສາຂາວິຊາ <span className="text-red-500">*</span></label>
                        <input type="text" name="major" required value={formData.major} onChange={handleInputChange} placeholder="ເຊັ່ນ: ວິທະຍາສາດຄອມພິວເຕີ" className="w-full p-3.5 border border-slate-200 rounded-xl text-sm" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500">ປີເລີ່ມສຶກສາ <span className="text-red-500">*</span></label>
                          <input type="number" name="startYear" required value={formData.startYear} onChange={handleInputChange} placeholder="ເຊັ່ນ: 2022" className="w-full p-3.5 border border-slate-200 rounded-xl text-sm" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500">ປີຄາດວ່າຈະຈົບ <span className="text-red-500">*</span></label>
                          <input type="number" name="expectedGradYear" required value={formData.expectedGradYear} onChange={handleInputChange} placeholder="ເຊັ່ນ: 2026" className="w-full p-3.5 border border-slate-200 rounded-xl text-sm" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500">ເກຣດສະເລ່ຍສະສົມປະຈຸບັນ (GPA)</label>
                        <input type="text" name="gpa" value={formData.gpa} onChange={handleInputChange} placeholder="ເຊັ່ນ: 3.25" className="w-full p-3.5 border border-slate-200 rounded-xl text-sm" />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 block">ເຄີຍຜ່ານການຝຶກງານ ຫຼື ບໍ່?</label>
                        <div className="flex items-center gap-5 h-[48px] px-1">
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input type="radio" name="hasInterned" value="yes" checked={formData.hasInterned === 'yes'} onChange={handleInputChange} className="w-4 h-4 text-indigo-600" />
                            <span className="text-sm font-semibold">ເຄີຍຜ່ານ</span>
                          </label>
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input type="radio" name="hasInterned" value="no" checked={formData.hasInterned === 'no'} onChange={handleInputChange} className="w-4 h-4 text-indigo-600" />
                            <span className="text-sm font-semibold">ຍັງບໍ່ເຄີຍ</span>
                          </label>
                        </div>
                      </div>

                      <AnimatePresence>
                        {formData.hasInterned === 'yes' && (
                          <motion.div 
                            key="internships-previous-details"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/60 overflow-hidden"
                          >
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-slate-500">ສະຖານທີ່ເຄີຍຝຶກງານ</label>
                              <input type="text" name="internshipPlace" value={formData.internshipPlace} onChange={handleInputChange} placeholder="ລະບຸຊື່ອົງກອນ/ບໍລິສັດ" className="w-full p-2.5 border border-slate-200 rounded-xl text-xs bg-white" />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-slate-500">ໄລຍະເວລາຝຶກງານ (ເດືອນ)</label>
                              <input type="text" name="internDuration" value={formData.internDuration} onChange={handleInputChange} placeholder="ເຊັ່ນ: 3 ເດືອນ" className="w-full p-2.5 border border-slate-200 rounded-xl text-xs bg-white" />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {formData.status === 'employee' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500">ສະຖາບັນ/ມະຫາວິທະຍາໄລທີ່ຈົບ <span className="text-red-500">*</span></label>
                        <input type="text" name="studyAt" required value={formData.studyAt} onChange={handleInputChange} className="w-full p-3.5 border border-slate-200 rounded-xl text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500">ສາຂາວິຊາທີ່ຈົບ <span className="text-red-500">*</span></label>
                        <input type="text" name="major" required value={formData.major} onChange={handleInputChange} className="w-full p-3.5 border border-slate-200 rounded-xl text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500">ປີທີ່ຈົບການສຶກສາ <span className="text-red-500">*</span></label>
                        <input type="number" name="gradYear" required value={formData.gradYear} onChange={handleInputChange} className="w-full p-3.5 border border-slate-200 rounded-xl text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500">ອາຊີບປະຈຸບັນ</label>
                        <input type="text" name="currentOccupation" value={formData.currentOccupation} onChange={handleInputChange} placeholder="ເຊັ່ນ: ພະນັກງານບໍລິສັດ, ຫວ່າງງານ..." className="w-full p-3.5 border border-slate-200 rounded-xl text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500">ຕຳແໜ່ງ</label>
                        <input type="text" name="position" value={formData.position} onChange={handleInputChange} className="w-full p-3.5 border border-slate-200 rounded-xl text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500">ປະສົບການເຮັດວຽກທັງໝົດ</label>
                        <input type="text" name="workDuration" value={formData.workDuration} onChange={handleInputChange} placeholder="ເຊັ່ນ: 1 ປີ 6 ເດືອນ" className="w-full p-3.5 border border-slate-200 rounded-xl text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500">ສະຖານທີ່ເຮັດວຽກຫຼ້າສຸດ/ປະຈຸບັນ</label>
                        <input type="text" name="workPlace" value={formData.workPlace} onChange={handleInputChange} className="w-full p-3.5 border border-slate-200 rounded-xl text-sm" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500">ເງິນເດືອນປະຈຸບັນ</label>
                          <input type="text" name="salary" value={formData.salary} onChange={handleInputChange} className="w-full p-3.5 border border-slate-200 rounded-xl text-sm" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500">ເງິນເດືອນທີ່ຄາດຫວັງ</label>
                          <input type="text" name="expectedSalary" value={formData.expectedSalary} onChange={handleInputChange} className="w-full p-3.5 border border-slate-200 rounded-xl text-sm" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* SECTION 5 - Skills */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-teal-600 px-6 py-4.5 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Languages className="text-teal-200 shrink-0" size={20} />
                <h2 className="text-base font-bold">5. ທັກສະຄວາມສາມາດດ້ານພາສາ ແລະ ຄອມພິວເຕີ</h2>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-teal-200 font-bold">ພាកທີ 5</span>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">ລະດັບຄວາມຮູ້ພາສາອັງກິດ</label>
                  <select name="englishLevel" value={formData.englishLevel} onChange={handleInputChange} className="w-full p-3.5 border border-slate-200 bg-white rounded-xl text-sm font-medium">
                    <option value="">ເລືອກລະດັບ</option>
                    <option value="None">ບໍ່ມີພື້ນຖານ (None)</option>
                    <option value="Basic">ຂັ້ນພື້ນຖານ (Basic A1-A2)</option>
                    <option value="Intermediate">ຂັ້ນກາງ (Intermediate B1-B2)</option>
                    <option value="Advanced">ຂັ້ນສູງ (Advanced C1-C2)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">ລະດັບຄວາມຮູ້ພາສາຈີນ</label>
                  <select name="chineseLevel" value={formData.chineseLevel} onChange={handleInputChange} className="w-full p-3.5 border border-slate-200 bg-white rounded-xl text-sm font-medium">
                    <option value="">ເລືອກລະດັບ</option>
                    <option value="None">ບໍ່ມີພື້ນຖານ (None)</option>
                    <option value="Basic">ຂັ້ນພື້ນຖານ (Basic HSK 1-2)</option>
                    <option value="Intermediate">ຂັ້ນກາງ (Intermediate HSK 3-4)</option>
                    <option value="Advanced">ຂັ້ນສູງ (Advanced HSK 5-6)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">ພາສາອື່ນໆ (ຖ້າມີ)</label>
                    <input type="text" name="otherLang" value={formData.otherLang} onChange={handleInputChange} placeholder="ເຊັ່ນ: ຍີ່ປຸ່ນ, ຫວຽດ..." className="w-full p-3.5 border border-slate-200 rounded-xl text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">ລະດັບຄວາມຮູ້</label>
                    <select name="otherLangLevel" value={formData.otherLangLevel} onChange={handleInputChange} className="w-full p-3.5 border border-slate-200 bg-white rounded-xl text-sm font-medium">
                      <option value="">ເລືອກລະດັບ</option>
                      <option value="Basic">ພື້ນຖານ</option>
                      <option value="Intermediate">ກາງ</option>
                      <option value="Advanced">ສູງ</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
                    <Monitor size={14} className="text-teal-500" /> ທັກສະຄວາມສາມາດຄອມພິວເຕີພື້ນຖານ
                  </label>
                  <select name="computerLevel" value={formData.computerLevel} onChange={handleInputChange} className="w-full p-3.5 border border-slate-200 bg-white rounded-xl text-sm font-medium">
                    <option value="">ເລືອກລະດັບ</option>
                    <option value="None">ບໍ່ມີພື້ນຖານ (None)</option>
                    <option value="Basic">ພື້ນຖານທົ່ວໄປ (Word, PowerPoint, Internet)</option>
                    <option value="Intermediate">ດີພໍໃຊ້ (Excel: Formulas, PPT visually polished)</option>
                    <option value="Advanced">ຂັ້ນສູງ (Programming, Excel: Power Query/Macros, Design Tools)</option>
                  </select>
                </div>
              </div>

              {/* Advanced Technology / Professional Skills Cards */}
              <div className="p-5 bg-teal-50/20 rounded-2xl border border-teal-100/40 space-y-4">
                <h4 className="text-[10px] font-black text-teal-600 uppercase tracking-widest flex items-center gap-1.5"><Zap size={13} /> ສະເພາະທັກສະດິຈິຕອນສະເພາະດ້ານ</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500">ທັກສະການໃຊ້ E-mail ເຮັດວຽກ</label>
                    <select name="emailSkill" value={formData.emailSkill} onChange={handleInputChange} className="w-full p-2.5 border border-slate-200 bg-white rounded-xl text-xs font-semibold">
                      <option value="">ເລືອກ</option>
                      <option value="None">ບໍ່ເຄີຍໃຊ້</option>
                      <option value="Basic">ພໍເຂົ້າໃຈສົ່ງຮັບໄຟລ໌</option>
                      <option value="Good">ຂຽນເປັນທາງການ & ຈັດລະບຽບກ່ອງຈົດໝາຍໄດ້ດີ</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500">ທັກສະການອອກແບບ (Graphic Design)</label>
                    <select name="designSkill" value={formData.designSkill} onChange={handleInputChange} className="w-full p-2.5 border border-slate-200 bg-white rounded-xl text-xs font-semibold">
                      <option value="">ເລືອກ</option>
                      <option value="None">ບໍ່ໄດ້ເລີຍ</option>
                      <option value="Canva">Canva (ຂັ້ນພື້ນຖານ - ຂັ້ນສູງ)</option>
                      <option value="Professional">Adobe Photoshop / Illustrator / Figma</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500">ທັກສະການຕັດຕໍ່ວິດີໂອ / ມີເດຍ</label>
                    <select name="contentCreatorSkill" value={formData.contentCreatorSkill} onChange={handleInputChange} className="w-full p-2.5 border border-slate-200 bg-white rounded-xl text-xs font-semibold">
                      <option value="">...ເລືອກ</option>
                      <option value="None">ບໍ່ມີພື້ນຖານ</option>
                      <option value="CapCut">CapCut (ມືຖື / ຄອມພິວເຕີ)</option>
                      <option value="Professional">Premiere Pro / After Effects / DaVinci</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">ທັກສະພິເສດອື່ນໆ ທີ່ທ່ານຢາກລະບຸເພີ່ມເຕີມ</label>
                <textarea name="additionalSkills" value={formData.additionalSkills} onChange={handleInputChange} rows={3} placeholder="ເຊັ່ນ: ທັກສະຄວາມເປັນຜູ້ນຳ, ຈັດຕັ້ງກິດຈະກຳ, ແຕ້ມຮູບ, ການເຈລະຈາ..." className="w-full p-3.5 border border-slate-200 rounded-xl outline-none focus:border-teal-500 text-sm font-medium" />
              </div>
            </div>
          </div>

{/* DYNAMIC SERVICE SUB-FORMS */}
          <AnimatePresence>
            
            {/* 1. Job Seekers Section */}
            {showJobFields && (
              <motion.div 
                key="form-section-job"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-white rounded-3xl shadow-sm border-2 border-emerald-500 overflow-hidden"
              >
                <div className="bg-emerald-600 px-6 py-4.5 text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Briefcase className="text-emerald-100 shrink-0" size={20} />
                    <h2 className="text-base font-bold">ຂໍ້ມູນເພີ່ມເຕີມສຳລັບຜູ້ຝາກປະຫວັດ ຫຼື ສະໝັກງານ</h2>
                  </div>
                  <span className="text-[10px] uppercase bg-emerald-700/60 px-2.5 py-1 rounded-full font-bold">ຝາກປະຫວັດ/ສະໝັກງານ</span>
                </div>

                <div className="p-6 md:p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500">ປະເພດວຽກເຮັດທີ່ຕ້ອງການ <span className="text-red-500">*</span></label>
                      <select name="jobType" required={showJobFields} value={formData.jobType} onChange={handleInputChange} className="w-full p-3.5 border border-slate-200 bg-white rounded-xl text-sm">
                        <option value="">ເລືອກປະເພດວຽກ</option>
                        <option value="ເຕັມເວລາ">ເຕັມເວລາ (Full-time)</option>
                        <option value="ເຄິ່ງເວລາ">ເຄິ່ງເວລາ (Part-time)</option>
                        <option value="ສັນຍາຈ້າງ">ສັນຍາຈ້າງ (Contract)</option>
                        <option value="ວຽກທາງໄກ">ວຽກທາງໄກ (Remote / WFH)</option>
                        <option value="ໄດ້ທັງໝົດ">ໄດ້ທັງໝົດ/ແລ້ວແຕ່ຕົກລົງ</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500">ສາຂາອາຊີບ ຫຼື ສາຍງານທີ່ສົນໃຈ <span className="text-red-500">*</span></label>
                      <select name="targetOccupation" required={showJobFields} value={formData.targetOccupation} onChange={handleInputChange} className="w-full p-3.5 border border-slate-200 bg-white rounded-xl text-sm">
                        <option value="">-- ເລືອກສາຍງານ --</option>
                        <option value="ການຕະຫຼາດ & ຂາຍ">ການຕະຫຼາດ & ການຂາຍ (Sales/Marketing)</option>
                        <option value="ບັນຊີ & ການເງິນ">ບັນຊີ & ການເງິນ (Accounting/Finance)</option>
                        <option value="ໄອທີ & ເຕັກໂນໂລຢີ">ໄອທີ, ໂປຣແກຣມເມີ & ເຕັກໂນໂລຢີ (IT/Tech)</option>
                        <option value="ບໍລິຫານ & ເລຂາ">ບໍລິຫານ, ເລຂາ & ປະສານງານ (Admin/Secretarial)</option>
                        <option value="ຊັບພະຍາກອນມະນຸດ">ຊັບພະຍາກອນມະນຸດ (HR)</option>
                        <option value="ສື່ ແລະ ອອກແບບ">ສື່, ຄອນເທັ້ນ & ນັກອອກແບບ (Media/Design)</option>
                        <option value="ບໍລິການລູກຄ້າ">ບໍລິການລູກຄ້າ, ຕ້ອນຮັບ & ການທ່ອງທ່ຽວ (Customer Service/Tourism)</option>
                        <option value="ວິສະວະກຳ & ກໍ່ສ້າງ">ວິສະວະກຳ & ກໍ່ສ້າງ (Engineering/Construction)</option>
                        <option value="ອື່ນໆ">ອື່ນໆ (Other)</option>
                      </select>
                    </div>

                    {formData.targetOccupation === 'ອື່ນໆ' && (
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-xs font-bold text-slate-500">ລະບຸສາຍງານອື່ນໆ <span className="text-red-500">*</span></label>
                        <input type="text" name="otherOccupation" required={formData.targetOccupation === 'ອື່ນໆ'} value={formData.otherOccupation} onChange={handleInputChange} placeholder="ລະບຸສາຍງານອື່ນໆຂອງທ່ານ" className="w-full p-3.5 border border-slate-200 rounded-xl text-sm" />
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500">ລະດັບຕຳແໜ່ງທີ່ຕ້ອງການ <span className="text-red-500">*</span></label>
                      <select name="targetPositionLevel" required={showJobFields} value={formData.targetPositionLevel} onChange={handleInputChange} className="w-full p-3.5 border border-slate-200 bg-white rounded-xl text-sm">
                        <option value="">ເລືອກລະດັບຕຳແໜ່ງ</option>
                        <option value="ພະນັກງານທົ່ວໄປ">ພະນັກງານທົ່ວໄປ (Entry Level)</option>
                        <option value="ພະນັກງານລະດັບກາງ">ພະນັກງານລະດັບກາງ (Junior / Mid-level)</option>
                        <option value="ຫົວໜ້າທີມ / ຜູ້ຈັດການ">ຫົວໜ້າທີມ / ຜູ້ຈັດການ (Senior / Manager)</option>
                        <option value="ຜູ້ບໍລິຫານ">ຜູ້ບໍລິຫານ (Director / Executive)</option>
                        <option value="ນັກສຶກສາຈົບໃໝ່ / ບໍ່ມີປະສົບການ">ນັກສຶກສາຈົບໃໝ່ / ບໍ່ມີປະສົບການ (Fresh Graduate)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500">ເງິນເດືອນທີ່ຄາດຫວັງ <span className="text-red-500">*</span></label>
                      <select name="expectedSalaryRange" required={showJobFields} value={formData.expectedSalaryRange} onChange={handleInputChange} className="w-full p-3.5 border border-slate-200 bg-white rounded-xl text-sm">
                        <option value="">ເລືອກເງິນເດືອນ</option>
                        <option value="ຕ່ຳກວ່າ 2,000,000 ກີບ">ຕ່ຳກວ່າ 2,000,000 ກີບ</option>
                        <option value="2,000,000 - 4,000,000 ກີບ">2,000,000 - 4,000,000 ກີບ</option>
                        <option value="4,000,000 - 7,000,000 ກີບ">4,000,000 - 7,000,000 ກີບ</option>
                        <option value="7,000,000 - 10,000,000 ກີບ">7,000,000 - 10,000,000 ກີບ</option>
                        <option value="ຫຼາຍກວ່າ 10,000,000 ກີບ">ຫຼາຍກວ່າ 10,000,000 ກີບ</option>
                        <option value="ແລ້ວແຕ່ຕົກລົງ / ຕາມໂຄງສ້າງບໍລິສັດ">ແລ້ວແຕ່ຕົກລົງ (Negotiable)</option>
                      </select>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold text-slate-500">ແຂວງທີ່ຕ້ອງການເຮັດວຽກ <span className="text-red-500">*</span></label>
                      <select name="targetWorkProvince" required={showJobFields} value={formData.targetWorkProvince} onChange={handleInputChange} className="w-full p-3.5 border border-slate-200 bg-white rounded-xl text-sm">
                        <option value="">ເລືອກແຂວງ</option>
                        <option value="ໄດ້ທັງໝົດ / ທຸກແຂວງ">ໄດ້ທັງໝົດ / ທຸກແຂວງ (Any Province)</option>
                        {Object.keys(geoData).map((p, idx) => <option key={`twp-${p}-${idx}`} value={p}>{p}</option>)}
                      </select>
                    </div>

                    <div className="space-y-3 md:col-span-2 pt-2">
                      <label className="text-xs font-bold text-slate-500 block">ຊ່ອງທາງສື່ ຫຼື ແຫຼ່ງຂໍ້ມູນຂ່າວສານທີ່ຄົ້ນຫາວຽກປະຈຸບັນ (ເລືອກໄດ້ຫຼາຍຂໍ້)</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                        {[
                          "Facebook / ໂຊຊຽວມີເດຍ",
                          "WhatsApp Groups / Services",
                          "ເວັບໄຊ́ປະກາດຮັບສະໝັກງານ (Job Websites)",
                          "ເຄືອຂ່າຍໝູ່ເພື່ອນ ຫຼື ຄອບຄົວ",
                          "JC Lao (Job Platform)",
                          "ອື່ນໆ"
                        ].map((channel, idx) => {
                          const isChecked = formData.jobSearchChannels.includes(channel);
                          return (
                            <label key={`jsc-${channel}-${idx}`} className={`flex items-center gap-2.5 p-3 rounded-lg border text-xs font-semibold cursor-pointer select-none transition-all ${isChecked ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}>
                              <input 
                                type="checkbox" 
                                checked={isChecked} 
                                onChange={() => handleJobChannelChange(channel)} 
                                className="w-4 h-4 text-emerald-600 rounded" 
                              />
                              <span>{channel}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {formData.jobSearchChannels.includes('ອື່ນໆ') && (
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-xs font-bold text-slate-500">ລະບຸຊ່ອງທາງອື່ນໆ <span className="text-red-500">*</span></label>
                        <input type="text" name="otherJobSource" required={formData.jobSearchChannels.includes('ອື່ນໆ')} value={formData.otherJobSource} onChange={handleInputChange} placeholder="ລະບຸຊ່ອງທາງອື່ນໆຂອງທ່ານ" className="w-full p-3.5 border border-slate-200 rounded-xl text-sm" />
                      </div>
                    )}

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold text-slate-500">ລິ້ງຜົນງານອອນລາຍ (Portfolio Link)</label>
                      <input type="text" name="portfolioLink" value={formData.portfolioLink} onChange={handleInputChange} placeholder="ເຊັ່ນ: Behance, GitHub, Google Drive LINK..." className="w-full p-3.5 border border-slate-200 rounded-xl text-sm" />
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-6 mt-6">
                    {renderPortfolioUploadSection("emerald")}
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. Internships Section */}
            {showInternFields && (
              <motion.div 
                key="form-section-intern"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden"
              >
                <div className="bg-sky-600 px-6 py-4.5 text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="text-sky-100 shrink-0" size={20} />
                    <h2 className="text-base font-bold">ຂໍ້ມູນເພີ່ມເຕີມສຳລັບຜູ້ຕ້ອງການຝຶກງານ</h2>
                  </div>
                  <span className="text-[10px] uppercase bg-sky-700/60 px-2.5 py-1 rounded-full font-bold">ຝຶກງານ</span>
                </div>

                <div className="p-6 md:p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500">ຈຸດປະສົງຫຼັກໃນການຝຶກງານຂອງທ່ານ <span className="text-red-500">*</span></label>
                      <select name="internPurpose" required={showInternFields} value={formData.internPurpose} onChange={handleInputChange} className="w-full p-3.5 border border-slate-200 bg-white rounded-xl text-sm">
                        <option value="">ເລືອກຈຸດປະສົງ</option>
                        <option value="ເກັບກ່ຽວປະສົບການເຮັດວຽກຈິງ">ເກັບກ່ຽວປະສົບການເຮັດວຽກຈິງ</option>
                        <option value="ເປັນເງື່ອນໄຂບັງຄັບໃນຫຼັກສູດການສຶກສາ">ເປັນສ່ວນໜຶ່ງຂອງຫຼັກສູດການຮຽນ (ຫຼັກສູດບັງຄັບ)</option>
                        <option value="ຫວັງຜົນເພື່ອບັນຈຸເຂົ້າເຮັດວຽກຕົວຈິງ">ຫວັງຜົນເພື່ອບັນຈຸເຂົ້າເຮັດວຽກຕົວຈິງກັບອົງກອນ</option>
                        <option value="ອື່ນໆ">ອື່ນໆ</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500">ຈຳນວນມື້ສະດວກຕໍ່ອາທິດ <span className="text-red-500">*</span></label>
                      <select name="internDaysPerWeek" required={showInternFields} value={formData.internDaysPerWeek} onChange={handleInputChange} className="w-full p-3.5 border border-slate-200 bg-white rounded-xl text-sm">
                        <option value="">ເລືອກຈຳນວນມື້</option>
                        <option value="3 ມື້ຕໍ່ອາທິດ">3 ມື້ຕໍ່ອາທິດ</option>
                        <option value="4 ມື້ຕໍ່ອາທິດ">4 ມື້ຕໍ່ອາທິດ</option>
                        <option value="5 ມື້ຕໍ່ອາທິດ">5 ມື້ຕໍ່ອາທິດ (ເຕັມເວລາ ວັນຈັນ-ວັນສຸກ)</option>
                        <option value="6 ມື້ຕໍ່ອາທິດ">6 ມື້ຕໍ່ອາທິດ</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500">ວັນທີ່ເລີ່ມຕົ້ນຝຶກງານ</label>
                        <input type="date" name="internStartDate" value={formData.internStartDate} onChange={handleInputChange} className="w-full p-3.5 border border-slate-200 rounded-xl text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500">ວັນທີສິ້ນສຸດການຝຶກງານ</label>
                        <input type="date" name="internEndDate" value={formData.internEndDate} onChange={handleInputChange} className="w-full p-3.5 border border-slate-200 rounded-xl text-sm" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500">ຮູບແບບການເຮັດວຽກທີ່ສະດວກ</label>
                      <select name="internFormat" value={formData.internFormat} onChange={handleInputChange} className="w-full p-3.5 border border-slate-200 bg-white rounded-xl text-sm">
                        <option value="">ເລືອກຮູບແບບ</option>
                        <option value="Onsite">ເຮັດວຽກຢູ່ຫ້ອງການ (Onsite)</option>
                        <option value="Remote">ເຮັດວຽກທາງໄກ (Remote / Online)</option>
                        <option value="Hybrid">ແບບປະສົມປະສານ (Hybrid / Onsite + Online)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500">ປະເພດອົງກອນທີ່ທ່ານສົນໃຈຢາກເຂົ້າຮ່ວມ</label>
                      <select name="internCompanyType" value={formData.internCompanyType} onChange={handleInputChange} className="w-full p-3.5 border border-slate-200 bg-white rounded-xl text-sm">
                        <option value="">ເລືອກປະເພດບໍລິສັດ</option>
                        <option value="ບໍລິສັດເອກະຊົນທົ່ວໄປ">ບໍລິສັດເອກະຊົນພາຍໃນ (Local Company)</option>
                        <option value="ບໍລິສັດຂ້າມຊາດ / ຕ່າງປະເທດ">ບໍລິສັດຕ່າງປະເທດ / ຂ້າມຊາດ (Multinationals)</option>
                        <option value="ອົງການຈັດຕັ້ງສາກົນ / NGO">ອົງການຈັດຕັ້ງສາກົນ / ບໍ່ສັງກັດລັດຖະບານ (NGOs)</option>
                        <option value="ພາກສ່ວນລັດຖະບານ">ພາກສ່ວນລັດຖະບານ (Government Sectors)</option>
                        <option value="ທຸລະກິດໃໝ່ / Startup">ທຸລະກິດເກີດໃໝ່ (Startup Company)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500">ສາຂາ, ພະແນກ ຫຼື ວຽກທີ່ສົນໃຈພິເສດ</label>
                      <input type="text" name="internSpecialInterest" value={formData.internSpecialInterest} onChange={handleInputChange} placeholder="ເຊັ່ນ: ການຕະຫຼາດ, ໄອທີ, ບັນຊີ" className="w-full p-3.5 border border-slate-200 rounded-xl text-sm" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500">ສິ່ງທີ່ຄາດຫວັງຈະໄດ້ຮັບຈາກການຝຶກງານ</label>
                      <input type="text" name="internExpectation" value={formData.internExpectation} onChange={handleInputChange} placeholder="ເຊັ່ນ: ປະສົບການຕົວຈິງ, ໃບຢັ້ງຢືນ..." className="w-full p-3.5 border border-slate-200 rounded-xl text-sm" />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <label className="text-xs font-bold text-slate-500">ແຮງຈູງໃຈໃນການສະໝັກເຂົ້າຮ່ວມຝຶກງານ</label>
                      <textarea name="internMotivation" value={formData.internMotivation} onChange={handleInputChange} rows={3} placeholder="ລະບຸແຮງຈູງໃຈຂອງທ່ານ..." className="w-full p-3.5 border border-slate-200 rounded-xl text-sm" />
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-6 mt-6">
                    {renderPortfolioUploadSection("sky")}
                  </div>
                </div>
              </motion.div>
            )}

            {/* 3. Training Section */}
            {showTrainingFields && (
              <motion.div 
                key="form-section-training"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden"
              >
                <div className="bg-indigo-600 px-6 py-4.5 text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <BookOpen className="text-indigo-100 shrink-0" size={20} />
                    <h2 className="text-base font-bold">ຂໍ້ມູນເພີ່ມເຕີມສຳລັບຜູ້ສະໝັກຝຶກອົບຮົມທັກສະ</h2>
                  </div>
                  <span className="text-[10px] uppercase bg-indigo-700/60 px-2.5 py-1 rounded-full font-bold">ຝຶກອົບຮົມທັກສະ</span>
                </div>

                <div className="p-6 md:p-8 space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500">ຫົວຂໍ້ການຝຶກອົບຮົມ ຫຼື ທັກສະທີ່ຫວັງຈະໄດ້ຮັບຈາກການຮຽນຮູ້ <span className="text-red-500">*</span></label>
                      <select name="trainingTopic" required={showTrainingFields} value={formData.trainingTopic} onChange={handleInputChange} className="w-full p-3.5 border border-slate-200 bg-white rounded-xl text-sm font-medium">
                        <option value="">ເລືອກຫົວຂໍ້ການຝຶກອົບຮົມ</option>
                        <option value="ທັກສະດ້ານເຕັກໂນໂລຢີ / ໄອທີ (IT & Tech Skills)">ທັກສະດ້ານເຕັກໂນໂລຢີ / ໄອທີ (IT & Tech Skills)</option>
                        <option value="ທັກສະພາສາຕ່າງປະເທດ (Language Skills)">ທັກສະພາສາຕ່າງປະເທດ (Language Skills)</option>
                        <option value="ທັກສະດ້ານການຂາຍ ແລະ ການຕະຫຼາດ (Sales & Marketing)">ທັກສະດ້ານການຂາຍ ແລະ ການຕະຫຼາດ (Sales & Marketing)</option>
                        <option value="ທັກສະການກະກຽມຄວາມພ້ອມດ້ານອາຊີບ (Job Readiness/Resume/Interview)">ທັກສະການກະກຽມຄວາມພ້ອມດ້ານອາຊີບ (Job Readiness/Resume/Interview)</option>
                        <option value="ທັກສະຊີວິດ ແລະ ການພັດທະນາຕົນເອງ (Soft Skills/Life Skills)">ທັກສະຊີວິດ ແລະ ການພັດທະນາຕົນເອງ (Soft Skills/Life Skills)</option>
                        <option value="ອື່ນໆ">ອື່ນໆ</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500">ເຫດຜົນໃນການສະໝັກ ແລະ ສິ່ງທີ່ຄາດຫວັງຈາກການຮຽນຮູ້</label>
                      <textarea name="trainingReason" value={formData.trainingReason} onChange={handleInputChange} rows={3} placeholder="ເຊັ່ນ: ຢາກພັດທະນາຕົນເອງເພື່ອສະໝັກງານ, ຢາກເກັ່ງຂຶ້ນ..." className="w-full p-3.5 border border-slate-200 rounded-xl text-sm" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 4. Volunteer Works Section */}
            {showVolunteerFields && (
              <motion.div 
                key="form-section-volunteer"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden"
              >
                <div className="bg-pink-600 px-6 py-4.5 text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <HandHeart className="text-pink-100 shrink-0" size={20} />
                    <h2 className="text-base font-bold">ຂໍ້ມູນເພີ່ມເຕີມສຳລັບຜູ້ສະໝັກຮ່ວມວຽກຈິດອາສາ</h2>
                  </div>
                  <span className="text-[10px] uppercase bg-pink-700/60 px-2.5 py-1 rounded-full font-bold">ວຽກຈິດອາສາ</span>
                </div>

                <div className="p-6 md:p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500">ຈຸດແຂງ ຫຼື ຈຸດເດັ່ນໃນຕົວທ່ານ</label>
                      <input type="text" name="volunteerStrengths" value={formData.volunteerStrengths} onChange={handleInputChange} placeholder="ເຊັ່ນ: ກະຕືລືລົ້ນ, ເຂົ້າກັບຄົນງ່າຍ..." className="w-full p-3.5 border border-slate-200 rounded-xl text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500">ຈຸດອ່ອນ ຫຼື ສິ່ງທີ່ທ່ານຕ້ອງປັບປຸງ</label>
                      <input type="text" name="volunteerWeaknesses" value={formData.volunteerWeaknesses} onChange={handleInputChange} placeholder="ເຊັ່ນ: ຂີ້ອາຍ, ເວົ້າບໍ່ເກັ່ງ..." className="w-full p-3.5 border border-slate-200 rounded-xl text-sm" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-xs font-bold text-slate-500">ຄວາມສາມາດພິເສດ</label>
                      <input type="text" name="volunteerSpecialSkills" value={formData.volunteerSpecialSkills} onChange={handleInputChange} placeholder="ເຊັ່ນ: ພິທີກອນ, ຖ່າຍຮູບ, ອອກແບບ, ຮ້ອງເພງ, ຫຼິ້ນເກມ..." className="w-full p-3.5 border border-slate-200 rounded-xl text-sm" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-xs font-bold text-slate-500">1. ເປັນຫຍັງເຈົ້າຈຶ່ງຢາກເຂົ້າມາເປັນອາສາສະໝັກຢູ່ JAO? <span className="text-red-500">*</span></label>
                      <textarea name="volunteerMotivationJAO" required={showVolunteerFields} value={formData.volunteerMotivationJAO} onChange={handleInputChange} rows={2} placeholder="ລະບຸເຫດຜົນ ແລະ ແຮງຈູງໃຈຂອງທ່ານ..." className="w-full p-3.5 border border-slate-200 rounded-xl text-sm" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-xs font-bold text-slate-500">2. ເຈົ້າຄິດວ່າການໃຫ້ຄຳປຶກສາ ດ້ານສາຍອາຊີບໃຫ້ແກ່ໄວໜຸ່ມມີຄວາມສຳຄັນແນວໃດໃນປັດຈຸບັນ? <span className="text-red-500">*</span></label>
                      <textarea name="volunteerOpinionCounseling" required={showVolunteerFields} value={formData.volunteerOpinionCounseling} onChange={handleInputChange} rows={2} placeholder="ແບ່ງປັນຄວາມຄິດເຫັນຂອງທ່ານ..." className="w-full p-3.5 border border-slate-200 rounded-xl text-sm" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-xs font-bold text-slate-500">3. ເຈົ້າຄາດຫວັງຈະໄດ້ຮັບຫຍັງຈາກ JAO? <span className="text-red-500">*</span></label>
                      <textarea name="volunteerExpectation" required={showVolunteerFields} value={formData.volunteerExpectation} onChange={handleInputChange} rows={2} placeholder="ລະບຸສິ່ງທີ່ທ່ານຄາດຫວັງຈະໄດ້ຮຽນຮູ້ ຫຼື ພັດທະນາ..." className="w-full p-3.5 border border-slate-200 rounded-xl text-sm" />
                    </div>
                    <div className="md:col-span-2 space-y-2.5">
                      <label className="text-xs font-bold text-slate-500">ສົນໃຈເຂົ້າຮ່ວມໃນທີມໃດ <span className="text-red-500">*</span></label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {[
                          {
                            value: 'Communication',
                            title: 'Communication',
                            description: 'ແມ່ນທີມສ້າງຄອນເທັ້ນ Photos, Video ແລະ Graphics'
                          },
                          {
                            value: 'Event',
                            title: 'Event',
                            description: 'ທີມຈັດງານນອກສະຖານທີ່, ຈັດຝຶກອົບຮົມ ແລະ ຮ່ວມການຈັດບູທ'
                          },
                          {
                            value: 'MOU',
                            title: 'MOU',
                            description: 'ແມ່ນທີມທີ່ພົວພັນນຳບໍລິສັດຕ່າງໆ ເພື່ອໃຫ້ຮູ້ຈັກການບໍລິການ ແລະ ເປັນຄູ່ຮ່ວມງານຂອງເຮົາ'
                          }
                        ].map((team) => {
                          const isSelected = formData.volunteerTeam === team.value;
                          return (
                            <label
                              key={team.value}
                              className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                isSelected
                                  ? 'border-pink-500 bg-pink-50/70 shadow-sm'
                                  : 'border-slate-200 bg-white hover:border-pink-300'
                              }`}
                            >
                              <input
                                type="radio"
                                name="volunteerTeam"
                                value={team.value}
                                required={showVolunteerFields}
                                checked={isSelected}
                                onChange={handleInputChange}
                                className="mt-1 w-4 h-4 accent-pink-600 shrink-0"
                              />
                              <div className="space-y-1">
                                <div className="text-sm font-bold text-slate-800">{team.title}</div>
                                <p className="text-xs text-slate-500 leading-relaxed">{team.description}</p>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500">ຈຳນວນມື້ສະດວກຕໍ່ອາທິດ <span className="text-red-500">*</span></label>
                      <select name="volunteerDaysPerWeek" required={showVolunteerFields} value={formData.volunteerDaysPerWeek} onChange={handleInputChange} className="w-full p-3.5 border border-slate-200 bg-white rounded-xl text-sm">
                        <option value="">ເລືອກຈຳນວນມື້</option>
                        <option value="1 ມື້ຕໍ່ອາທິດ">1 ມື້ຕໍ່ອາທິດ</option>
                        <option value="2 ມື້ຕໍ່ອາທິດ">2 ມື້ຕໍ່ອາທິດ</option>
                        <option value="3 ມື້ຕໍ່ອາທິດ">3 ມື້ຕໍ່ອາທິດ</option>
                        <option value="4 ມື້ ຫຼື ຫຼາຍກວ່າ">4 ມື້ ຫຼື ຫຼາຍກວ່າ</option>
                        <option value="ອື່ນໆ">ອື່ນໆ (ລະບຸຂ້າງລຸ່ມ)</option>
                      </select>
                    </div>

                    {formData.volunteerDaysPerWeek === 'ອື່ນໆ' && (
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-bold text-slate-500">ລະບຸຄວາມສະດວກອື່ນໆ</label>
                        <input type="text" name="volunteerDaysPerWeekOther" value={formData.volunteerDaysPerWeekOther} onChange={handleInputChange} className="w-full p-3.5 border border-slate-200 rounded-xl text-sm" />
                      </div>
                    )}

                    <div className="md:col-span-2 space-y-2">
                      <label className="text-xs font-bold text-slate-500">ວັນ ຫຼື ມື້ທີ່ສະດວກສະເພາະຕົວ (ເຊັ່ນ: ທຸກໆວັນເສົາ, ທຸກໆວັນຈັນ-ພຸດ ຕອນແລງ...)</label>
                      <input type="text" name="volunteerAvailableDays" value={formData.volunteerAvailableDays} onChange={handleInputChange} placeholder="ລະບຸວັນເວລາທີ່ສະດວກ" className="w-full p-3.5 border border-slate-200 rounded-xl text-sm" />
                    </div>
                  </div>

                  {/* EMERGENCY CONTACT FOR VOLUNTEER PROTECTION */}
                  <div className="p-5 bg-red-50/40 rounded-2xl border border-red-100/50 space-y-4">
                    <h4 className="text-[10px] font-black text-red-500 uppercase tracking-widest flex items-center gap-1.5">
                      <AlertCircle size={13} /> ຂໍ້ມູນຕິດຕໍ່ສຸກເສີນ (ເພື່ອຄວາມປອດໄພ) <span className="text-red-500">*</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-500">ຊື່ ແລະ ສາຍສຳພັນກັບຜູ້ຕິດຕໍ່ສຸກເສີນ <span className="text-red-500">*</span></label>
                        <input type="text" name="emergencyContactName" required={showVolunteerFields} value={formData.emergencyContactName} onChange={handleInputChange} placeholder="ເຊັ່ນ: ທ້າວ ຄຳດີ (ພໍ່)" className="w-full p-2.5 border border-slate-200 rounded-xl text-xs bg-white" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-500">ເບີໂທລະສັບຕິດຕໍ່ສຸກເສີນ <span className="text-red-500">*</span></label>
                        <input type="tel" name="emergencyContactPhone" required={showVolunteerFields} value={formData.emergencyContactPhone} onChange={handleInputChange} placeholder="ເຊັ່ນ: 020 XXXXXXXX" className="w-full p-2.5 border border-slate-200 rounded-xl text-xs bg-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 5. Career Counseling Section */}
            {showCounselingFields && (
              <motion.div 
                key="form-section-counseling"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden"
              >
                <div className="bg-violet-600 px-6 py-4.5 text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Compass className="text-violet-100 shrink-0" size={20} />
                    <h2 className="text-base font-bold">ຂໍ້ມູນເພີ່ມເຕີມສຳລັບປຶກສາເລື່ອງສາຍອາຊີບ </h2>
                  </div>
                  <span className="text-[10px] uppercase bg-violet-700/60 px-2.5 py-1 rounded-full font-bold">ປຶກສາສາຍອາຊີບ</span>
                </div>

                <div className="p-6 md:p-8 space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500">ສະຖານະຄວາມຮູ້ສຶກ ຫຼື ຄວາມພ້ອມດ້ານອາຊີບຂອງທ່ານໃນປະຈຸບັນ <span className="text-red-500">*</span></label>
                    <select name="counselingCurrentState" required={showCounselingFields} value={formData.counselingCurrentState} onChange={handleInputChange} className="w-full p-3.5 border border-slate-200 bg-white rounded-xl text-sm font-medium">
                      <option value="">ເລືອກສະຖານະຄວາມພ້ອມ</option>
                      <option value="ຍັງຄົ້ນຫາຕົນເອງ">ກຳລັງຊອກຫາຕົນເອງ (ຍັງບໍ່ຮູ້ວ່າສົນໃຈອາຊີບໃດ)</option>
                      <option value="ມີເປົ້າໝາຍແລ້ວແຕ່ຕ້ອງການການແນະນຳ">ມີເປົ້າໝາຍອາຊີບແລ້ວ ແຕ່ຢາກຮູ້ວິທີການກະກຽມຄວາມພ້ອມ</option>
                      <option value="ຢາກປ່ຽນສາຍງານໃໝ່">ຢາກປ່ຽນສາຍງານໃໝ່ (Career Shifter)</option>
                      <option value="ຕ້ອງການສຳຫຼວດທັກສະທີ່ຕະຫຼາດຕ້ອງການ">ຕ້ອງການຮູ້ຄວາມຮູ້ ແລະ ທັກສະທີ່ຈຳເປັນໃນຕະຫຼາດແຮງງານປະຈຸບັນ</option>
                      <option value="ອື່ນໆ">ອື່ນໆ</option>
                    </select>
                  </div>

                  {/* Personality checkbox options list */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-wider block">ບຸກຄະລິກກະພາບ ຫຼື ສິ່ງທີ່ທ່ານມັກເຮັດ (ເລືອກໄດ້ຫຼາຍຂໍ້)</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                      {personalityOptions.map((item, idx) => {
                        const isChecked = formData.counselingPersonality.includes(item);
                        return (
                          <label key={`personality-${item}-${idx}`} className={`flex items-center gap-2.5 p-3 rounded-lg border text-xs font-semibold cursor-pointer select-none transition-all ${isChecked ? 'bg-violet-50 border-violet-500 text-violet-900' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}>
                            <input 
                              type="checkbox" 
                              checked={isChecked} 
                              onChange={() => handleCounselingArrayChange('counselingPersonality', item)} 
                              className="w-4 h-4 text-violet-600" 
                            />
                            <span>{item}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500">ຮູບແບບ ຫຼື ສະພາບແວດລ້ອມການເຮັດວຽກທີ່ມັກ</label>
                    <select name="counselingWorkPreference" value={formData.counselingWorkPreference} onChange={handleInputChange} className="w-full p-3.5 border border-slate-200 bg-white rounded-xl text-sm">
                      <option value="">ເລືອກຮູບແບບ</option>
                      <option value="ວຽກທີ່ເປັນລະບຽບແບບແຜນຊັດເຈນ">ວຽກທີ່ເປັນລະບຽບແບບແຜນຊັດເຈນ (Structured Work)</option>
                      <option value="ວຽກທີ່ທ້າທາຍ ແລະ ປ່ຽນແປງຕະຫຼອດເວລາ">ວຽກທີ່ທ້າທາຍ ແລະ ປ່ຽນແປງຕະຫຼອດເວລາ (Dynamic Work)</option>
                      <option value="ວຽກທີ່ໄດ້ພົບປະເວົ້າຈາ ແລະ ຊ່ວຍເຫຼືອຄົນ">ວຽກທີ່ໄດ້ພົບປະເວົ້າຈາ ແລະ ຊ່ວຍເຫຼືອຄົນ (Social Work)</option>
                      <option value="ວຽກສ້າງສັນ ແລະ ມີອິດສະຫຼະໃນການຄິດ">ວຽກສ້າງສັນ ແລະ ມີອິດສະຫຼະໃນການຄິດ (Creative & Free-thinking)</option>
                      <option value="ວຽກທີ່ເປັນວິຊາການ ແລະ ວິເຄາະຂໍ້ມູນ">ວຽກທີ່ເປັນວິຊາການ ແລະ ວິເຄາະຂໍ້ມູນ (Analytical & Academic Work)</option>
                    </select>
                  </div>

                  {/* Workplace options checklist */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-wider block">ຮູບແບບສະຖານທີ່ເຮັດວຽກທີ່ທ່ານສົນໃຈ (ເລືອກໄດ້ຫຼາຍຂໍ້)</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {workplaceOptions.map((item, idx) => {
                        const isChecked = formData.counselingWorkplace.includes(item);
                        return (
                          <label key={`workplace-${item}-${idx}`} className={`flex items-center gap-2.5 p-3 rounded-lg border text-xs font-semibold cursor-pointer select-none transition-all ${isChecked ? 'bg-violet-50 border-violet-500 text-violet-900' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}>
                            <input 
                              type="checkbox" 
                              checked={isChecked} 
                              onChange={() => handleCounselingArrayChange('counselingWorkplace', item)} 
                              className="w-4 h-4 text-violet-600" 
                            />
                            <span>{item}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Suitable job checklist selection with visual constraint display */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-wider block">ເລືອກອາຊີບທີ່ທ່ານສົນໃຈ ແລະ ຢາກປຶກສາ</label>
                      <span className="text-[10px] font-bold text-violet-600 bg-violet-100 px-2.5 py-0.5 rounded-full select-none">
                        ຈຳກັດສູງສຸດ 3 ຂໍ້
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {suitableJobOptions.map((item, idx) => {
                        const isChecked = formData.counselingSuitableJobs.includes(item);
                        const isMaxReached = formData.counselingSuitableJobs.length >= 3;
                        return (
                          <label 
                            key={`suitable-${item}-${idx}`} 
                            className={`flex items-center gap-2.5 p-3 rounded-lg border text-xs font-semibold select-none transition-all ${isChecked ? 'bg-violet-50 border-violet-500 text-violet-900 font-black' : (isMaxReached ? 'bg-slate-50 border-slate-100 text-slate-350 cursor-not-allowed' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 cursor-pointer')}`}
                          >
                            <input 
                              type="checkbox" 
                              disabled={isMaxReached && !isChecked}
                              checked={isChecked} 
                              onChange={() => handleCounselingArrayChange('counselingSuitableJobs', item)} 
                              className="w-4 h-4 text-violet-600 disabled:opacity-40" 
                            />
                            <span>{item}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500">ຊ່ວງວັນ ແລະ ເວລາທີ່ສະດວກໃນການຮັບການປຶກສາ <span className="text-red-500">*</span></label>
                    <select name="counselingDate" required={showCounselingFields} value={formData.counselingDate} onChange={handleInputChange} className="w-full p-3.5 border border-slate-200 bg-white rounded-xl text-sm font-medium">
                      <option value="">ເລືອກຊ່ວງວັນເວລາ</option>
                      <option value="ວັນຈັນ-ວັນສຸກ: ຕອນເຊົ້າ (9:00 - 12:00)">ວັນຈັນ-ວັນສຸກ: ຕອນເຊົ້າ (9:00 - 12:00)</option>
                      <option value="ວັນຈັນ-ວັນສຸກ: ຕອນແລງ (13:30 - 16:30)">ວັນຈັນ-ວັນສຸກ: ຕອນແລງ (13:30 - 16:30)</option>
                      <option value="ວັນເສົາ: ຕອນເຊົ້າ (9:00 - 12:00)">ວັນເສົາ: ຕອນເຊົ້າ (9:00 - 12:00)</option>
                      <option value="ແລ້ວແຕ່ການນັດໝາຍຂອງທີມງານ">ແລ້ວແຕ່ການນັດໝາຍສະດວກຂອງທີມງານ</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 6. Dissemination Activity Section */}
            {showDisseminationFields && (
              <motion.div 
                key="form-section-dissemination"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden"
              >
                <div className="bg-fuchsia-600 px-6 py-4.5 text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Layout className="text-fuchsia-100 shrink-0" size={20} />
                    <h2 className="text-base font-bold">ຂໍ້ມູນເພີ່ມເຕີມສຳລັບຜູ້ເຂົ້າຮ່ວມກິດຈະກຳເຜີຍແຜ່</h2>
                  </div>
                  <span className="text-[10px] uppercase bg-fuchsia-700/60 px-2.5 py-1 rounded-full font-bold">ກິດຈະກຳເຜີຍແຜ່</span>
                </div>

                <div className="p-6 md:p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500">ຫົວຂໍ້ ຫຼື ກິດຈະກຳເຜີຍແຜ່ທີ່ທ່ານສົນໃຈເຂົ້າຮ່ວມ <span className="text-red-500">*</span></label>
                      <select name="disseminationTopicInterested" required={showDisseminationFields} value={formData.disseminationTopicInterested} onChange={handleInputChange} className="w-full p-3.5 border border-slate-200 bg-white rounded-xl text-sm font-medium">
                        <option value="">-- ກະລຸນາເລືອກ --</option>
                        <option value="ການແນະນຳວິທີຂຽນ CV ແລະ ກຽມຕົວສຳພາດງານ">ການແນະນຳວິທີຂຽນ CV ແລະ ກຽມຕົວສຳພາດງານ</option>
                        <option value="ການເຜີຍແຜ່ຂໍ້ມູນການສຶກສາ ແລະ ທຶນການສຶກສາ">ການເຜີຍແຜ່ຂໍ້ມູນການສຶກສາ ແລະ ທຶນການສຶກສາ</option>
                        <option value="ງານວາງສະແດງອາຊີບ ແລະ ນັດພົບແຮງງານ">ງານວາງສະແດງອາຊີບ ແລະ ນັດພົບແຮງງານ</option>
                        <option value="ການແບ່ງປັນປະສົບການຈາກຜູ້ຊ່ຽວຊານໃນອາຊີບຕ່າງໆ">ການແບ່ງປັນປະສົບການຈາກຜູ້ຊ່ຽວຊານໃນອາຊີບຕ່າງໆ</option>
                        <option value="ອື່ນໆ">ອື່ນໆ</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500">ຊ່ອງທາງທີ່ທ່ານໄດ້ຮັບຂໍ້ມູນຂ່າວສານກ່ຽວກັບກິດຈະກຳນີ້ <span className="text-red-500">*</span></label>
                      <select name="disseminationSource" required={showDisseminationFields} value={formData.disseminationSource} onChange={handleInputChange} className="w-full p-3.5 border border-slate-200 bg-white rounded-xl text-sm font-medium">
                        <option value="">-- ກະລຸນາເລືອກ --</option>
                        <option value="Facebook / ໂຊຊຽວມີເດຍ">Facebook / ໂຊຊຽວມີເດຍ</option>
                        <option value="ໝູ່ເພື່ອນ ຫຼື ຄອບຄົວ">ໝູ່ເພື່ອນ ຫຼື ຄອບຄົວ</option>
                        <option value="ອາຈານ ຫຼື ສະຖາບັນການສຶກສາ">ອາຈານ ຫຼື ສະຖາບັນການສຶກສາ</option>
                        <option value="ໂປສເຕີ ຫຼື ປ້າຍໂຄສະນາ">ໂປສເຕີ ຫຼື ປ້າຍໂຄສະນາ</option>
                        <option value="ອື່ນໆ">ອື່ນໆ</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500">ເຫດຜົນ ຫຼື ແຮງຈູງໃຈທີ່ຢາກເຂົ້າຮ່ວມກິດຈະກຳ ແລະ ສິ່ງທີ່ຄາດຫວັງຈະໄດ້ຮັບ</label>
                    <textarea name="disseminationExpectation" value={formData.disseminationExpectation} onChange={handleInputChange} rows={3} placeholder="ເຊັ່ນ: ຢາກໄດ້ຄວາມຮູ້ກ່ຽວກັບລາຍລະອຽດວຽກ, ຕ້ອງການແນວທາງໃນການຮຽນຕໍ່..." className="w-full p-3.5 border border-slate-200 rounded-xl text-sm" />
                  </div>

                  {/* Portfolio/CV Upload for Dissemination per User Request */}
                  <div className="border-t border-slate-100 pt-6">
                    {renderPortfolioUploadSection("violet")}
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

          {/* SUBMIT BUTTON WITH LOADING INDICATORS */}
          <div className="pt-6">
            <button 
              type="submit" 
              disabled={isLoading}
              className="group relative w-full bg-blue-600 hover:bg-blue-700/95 disabled:bg-blue-400 text-white font-black py-4.5 rounded-2xl transition-all shadow-xl hover:shadow-blue-600/25 active:scale-99 flex items-center justify-center gap-3 cursor-pointer disabled:cursor-not-allowed overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>ກຳລັງສົ່ງຂໍ້ມູນ... ກະລຸນາລໍຖ້າ</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={20} />
                  <span className="tracking-wide text-base">ຢືນຢັນການລົງທະບຽນ (Submit Form)</span>
                </>
              )}
            </button>
          </div>

        </form>
          </div>
        </main>
      </div>
    </div>
  );
}
