const mellstroyImage = new Image();
mellstroyImage.src = "photo_2026-06-15_12-09-02-removebg-preview.png";

// ==========================================================================
// 1. LOCALIZATION SYSTEM (i18n)
// ==========================================================================
const TRANSLATIONS = {
    ru: {
        shop_title: "Магазин Улучшений",
        permanent_upgrades: "Постоянные улучшения",
        luck_up_title: "Клевер Удачи",
        luck_up_desc: "Увеличивает шанс выпадения редких аур.",
        speed_up_title: "Быстрый спиннер",
        speed_up_desc: "Уменьшает задержку между прокрутками.",
        temporary_potions: "Зелья (Временные)",
        potion_luck_title: "Зелье Фортуны (+2.0x Удача)",
        potion_luck_desc: "Удваивает удачу на 60 секунд.",
        cosmetics: "Косметика (Скины)",
        platforms_title: "Платформы",
        characters_title: "Персонажи",
        buy_btn: "Купить",
        upgrade_btn: "Улучшить",
        no_aura_equipped: "Аура не экипирована",
        roll_success_title: "ВЫ ВЫБИЛИ",
        splash_close: "Отлично",
        roll_status_ready: "Готов к крутке...",
        auto_roll: "Авто-крутка",
        roll_btn_text: "КРУТИТЬ",
        quick_roll: "Быстрая крутка",
        collection_title: "Книга Аур",
        progress_label: "Собрано аур:",
        reset_confirm_title: "Подтверждение сброса",
        reset_confirm_text: "Вы уверены, что хотите полностью сбросить свой прогресс? Все ваши открытые ауры, монеты и улучшения будут стерты навсегда.",
        cancel_btn: "Отмена",
        confirm_btn: "Сбросить",
        max_level: "МАКС.",
        roll_status_spinning: "Крутим...",
        roll_status_cooldown: "Перезарядка...",
        equipped: "Экипировано",
        equip: "Надеть",
        locked: "Закрыто",
        buy: "Купить",
        skin_default: "Обычный",
        skin_gold: "Золотой",
        skin_cyber: "Кибер",
        skin_lava: "Лавовый",
        skin_void: "Бездна",
        char_default: "Человечек",
        char_king: "Король",
        char_knight: "Рыцарь",
        char_shadow: "Тень",
        char_mellstroy: "Меллстрой",
        rarity_chance: "Шанс: 1/{chance}",
        total_rolls_stat: "Круток: {count}",
        pot_active: "Активно: {sec}с",
        collection_tab_title: "Книга Аур",
        achievements_tab_title: "Достижения",
        achievement_unlocked_toast: "Достижение!",
        settings_title: "Настройки",
        settings_tab_general: "Основное",
        settings_tab_auras: "Ауры",
        settings_sound: "Звуки",
        settings_sound_desc: "Включить или отключить звуковые эффекты в игре",
        settings_effects: "Эффекты частиц",
        settings_effects_desc: "Включить отображение аур и эффектов спинов",
        close_btn: "Закрыть"
    },
    en: {
        shop_title: "Upgrade Shop",
        permanent_upgrades: "Permanent Upgrades",
        luck_up_title: "Luck Clover",
        luck_up_desc: "Increases the chance of rolling rare auras.",
        speed_up_title: "Fast Spinner",
        settings_title: "Settings",
        settings_tab_general: "General",
        settings_tab_auras: "Auras",
        settings_sound: "Sounds",
        settings_sound_desc: "Enable or disable sound effects in the game",
        settings_effects: "Particle Effects",
        settings_effects_desc: "Enable aura visuals and spin effects",
        close_btn: "Close",
        speed_up_desc: "Reduces the cooldown between spins.",
        temporary_potions: "Potions (Temporary)",
        potion_luck_title: "Fortune Potion (+2.0x Luck)",
        potion_luck_desc: "Doubles your luck for 60 seconds.",
        cosmetics: "Cosmetics (Skins)",
        platforms_title: "Platforms",
        characters_title: "Characters",
        buy_btn: "Buy",
        upgrade_btn: "Upgrade",
        no_aura_equipped: "No aura equipped",
        roll_success_title: "YOU ROLLED",
        splash_close: "Awesome",
        roll_status_ready: "Ready to spin...",
        auto_roll: "Auto Roll",
        roll_btn_text: "SPIN",
        quick_roll: "Quick Roll",
        collection_title: "Aura Book",
        progress_label: "Auras Unlocked:",
        reset_confirm_title: "Confirm Reset",
        reset_confirm_text: "Are you sure you want to completely reset your progress? All your unlocked auras, coins, and upgrades will be erased forever.",
        cancel_btn: "Cancel",
        confirm_btn: "Reset",
        max_level: "MAX",
        roll_status_spinning: "Spinning...",
        roll_status_cooldown: "Cooldown...",
        equipped: "Equipped",
        equip: "Equip",
        locked: "Locked",
        buy: "Buy",
        skin_default: "Default",
        skin_gold: "Golden",
        skin_cyber: "Cyber",
        skin_lava: "Lava",
        skin_void: "Void",
        char_default: "Stickman",
        char_king: "King",
        char_knight: "Knight",
        char_shadow: "Shadow",
        char_mellstroy: "Mellstroy",
        rarity_chance: "Chance: 1/{chance}",
        total_rolls_stat: "Rolls: {count}",
        pot_active: "Active: {sec}s",
        collection_tab_title: "Aura Book",
        achievements_tab_title: "Achievements",
        achievement_unlocked_toast: "Achievement Unlocked!"
    }
};

let currentLang = localStorage.getItem("auraroll_lang") || "ru";

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("auraroll_lang", lang);
    updateLanguageDOM();
}

function updateLanguageDOM() {
    const t = TRANSLATIONS[currentLang];

    // Update simple translations with data-i18n attribute
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (t[key]) {
            el.textContent = t[key];
        }
    });

    // Update dynamic texts
    updateUI();
    renderAuraList();
    renderCosmetics();
    renderAchievements();
    if (typeof renderSettingsAuras === 'function') {
        renderSettingsAuras();
    }
}


// ==========================================================================
// 2. AURA DEFINITIONS
// ==========================================================================
const AURAS = [
    {
        id: "common",
        name: { ru: "Обычная Аура", en: "Common Aura" },
        chance: 2,
        color: "#9ca3af",
        coinBonus: 1,
        desc: { ru: "Обычное серое облако вокруг персонажа", en: "A basic grey cloud floating around the character" }
    },
    {
        id: "uncommon",
        name: { ru: "Необычная Аура", en: "Uncommon Aura" },
        chance: 4,
        color: "#22c55e",
        coinBonus: 2,
        desc: { ru: "Приятное зеленое облако с маленькими искрами", en: "A nice green cloud with small sparks" }
    },
    {
        id: "rare",
        name: { ru: "Редкая Аура", en: "Rare Aura" },
        chance: 8,
        color: "#0284c7",
        coinBonus: 5,
        desc: { ru: "Яркое синее облако с восходящими круговыми импульсами", en: "A bright blue cloud with rising ring pulses" }
    },
    {
        id: "epic",
        name: { ru: "Эпическая Аура", en: "Epic Aura" },
        chance: 16,
        color: "#a855f7",
        coinBonus: 12,
        desc: { ru: "Волшебное фиолетовое облако и взлетающие звездочки", en: "A magical purple cloud and rising star particles" }
    },
    {
        id: "wind",
        name: { ru: "Воздушная Аура", en: "Wind Aura" },
        chance: 32,
        color: "#06b6d4",
        coinBonus: 30,
        desc: { ru: "Спирали ветра вокруг и маленькая тучка над головой", en: "Swirling wind spirals and a small wind cloud above head" }
    },
    {
        id: "water",
        name: { ru: "Водная Аура", en: "Water Aura" },
        chance: 64,
        color: "#2563eb",
        coinBonus: 70,
        desc: { ru: "Эффект водопада на теле и волны расходящиеся по платформе", en: "Waterfall drops cascading down and waves rippling out" }
    },
    {
        id: "legendary",
        name: { ru: "Легендарная Аура", en: "Legendary Aura" },
        chance: 100,
        color: "#eab308",
        coinBonus: 200,
        desc: { ru: "Огромная звезда на груди и мощные столбы желтого света", en: "A huge star on the chest and powerful yellow beams" }
    },
    {
        id: "emerald",
        name: { ru: "Изумрудная Аура", en: "Emerald Aura" },
        chance: 250,
        color: "#10b981",
        coinBonus: 500,
        desc: { ru: "Два сияющих изумруда на плечах и дождь из драгоценных камней", en: "Two shining emeralds on your shoulders and a rain of precious gems" }
    },
    {
        id: "relaxed",
        name: { ru: "Расслабленная Аура", en: "Relaxed Aura" },
        chance: 500,
        color: "#93c5fd",
        coinBonus: 1000,
        desc: { ru: "Персонаж спит на мягких облаках под сияющей синей луной", en: "The character sleeps on soft clouds under a glowing blue moon" }
    },
    {
        id: "nature",
        name: { ru: "Аура Природы", en: "Nature Aura" },
        chance: 750,
        color: "#22c55e",
        coinBonus: 1500,
        desc: { ru: "Токсично-зелёное облако у ног, деревянные ноги, цветы на голове и кружащие листья", en: "Toxic green cloud at your feet, wooden legs, flowers on your head and circling leaves" }
    },
    {
        id: "glitch",
        name: { ru: "Глитч Аура", en: "Glitch Aura" },
        chance: 1000,
        color: "#00ffcc",
        coinBonus: 2000,
        desc: { ru: "Левитирующий человечек с глитч-прямоугольниками и кастомной катсценой получения", en: "Levitating character with glitch rectangles and a custom reveal cutscene" }
    },
    {
        id: "malware",
        name: { ru: "Вирус Аура", en: "Malware Aura" },
        chance: 2500,
        color: "#ff0055",
        coinBonus: 5000,
        desc: { ru: "Зараженный цифровой код, тревожные предупреждения и красные пиксельные сбои", en: "Infected digital code, warning popups, and glitchy red pixel streams" }
    },
    {
        id: "demon",
        name: { ru: "Демоническая Аура", en: "Demon Aura" },
        chance: 5000,
        color: "#ff3300",
        coinBonus: 10000,
        desc: { ru: "Под ногами разверзается огненный портал в преисподнюю, наделяя персонажа рогами и трезубцем", en: "A fiery portal to the underworld opens beneath your feet, granting horns and a trident" }
    },
    {
        id: "angel",
        name: { ru: "Ангельская Аура", en: "Angel Aura" },
        chance: 7500,
        color: "#fef08a",
        coinBonus: 20000,
        desc: { ru: "Небесный свет озаряет персонажа, даруя ему нимб и ангельские крылья", en: "Heavenly light shines upon the character, granting a halo and angelic wings" }
    },
    {
        id: "earth",
        name: { ru: "Земная Аура", en: "Earth Aura" },
        chance: 10000,
        color: "#3b82f6",
        coinBonus: 50000,
        desc: { ru: "Превращает голову в Землю с континентами, на плечах вырастают горы, а на груди — каменная броня", en: "Turns head into Earth, grows mountains on shoulders, and places rock armor on chest" }
    }
];


// ==========================================================================
// 3. COSMETIC SHOP ITEMS
// ==========================================================================
const PLATFORMS = [
    { id: "default", nameKey: "skin_default", cost: 0, color: "#64748b", secondaryColor: "#475569", effect: "none" },
    { id: "gold", nameKey: "skin_gold", cost: 250, color: "#fbbf24", secondaryColor: "#d97706", effect: "gold-sparks" },
    { id: "cyber", nameKey: "skin_cyber", cost: 500, color: "#06b6d4", secondaryColor: "#0891b2", effect: "neon-lines" },
    { id: "lava", nameKey: "skin_lava", cost: 750, color: "#ef4444", secondaryColor: "#b91c1c", effect: "lava-cracks" },
    { id: "void", nameKey: "skin_void", cost: 1000, color: "#8b5cf6", secondaryColor: "#4c1d95", effect: "void-swirl" }
];

const CHARACTERS = [
    { id: "default", nameKey: "char_default", cost: 0, color: "#e2e8f0", style: "normal" },
    { id: "king", nameKey: "char_king", cost: 300, color: "#fef08a", style: "king" },
    { id: "knight", nameKey: "char_knight", cost: 600, color: "#94a3b8", style: "knight" },
    { id: "shadow", nameKey: "char_shadow", cost: 900, color: "#1e1b4b", style: "shadow" },
    { id: "mellstroy", nameKey: "char_mellstroy", cost: 0, color: "#e2e8f0", style: "normal" }
];


// ==========================================================================
// 4. GAME STATE MANAGEMENT
// ==========================================================================
let state = {
    rolls: 0,
    coins: 0,
    equippedAura: null,
    unlockedAuras: { "common": 0 }, // Key: Aura ID, Value: count rolled
    unlockedAchievements: {}, // Key: Achievement ID, Value: timestamp unlocked
    upgrades: {
        luck: 1, // level 1-10
        speed: 1 // level 1-10
    },
    potionLuckTime: 0, // Remaining seconds
    cosmetics: {
        equippedPlatform: "default",
        equippedCharacter: "default",
        unlockedPlatforms: ["default"],
        unlockedCharacters: ["default"]
    },
    settings: {
        soundEnabled: true,
        effectsEnabled: true,
        auras: {} // Maps auraId to { disablePopup: false, disableCutscene: false }
    }
};

// Load saved state
function loadState() {
    const saved = localStorage.getItem("auraroll_save");
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            // Perform deep/careful merging of state to avoid losing nested default keys
            state.rolls = parsed.rolls !== undefined ? parsed.rolls : state.rolls;
            state.coins = parsed.coins !== undefined ? parsed.coins : state.coins;
            state.equippedAura = parsed.equippedAura !== undefined ? parsed.equippedAura : state.equippedAura;
            state.potionLuckTime = parsed.potionLuckTime !== undefined ? parsed.potionLuckTime : state.potionLuckTime;

            if (parsed.unlockedAuras) {
                state.unlockedAuras = { ...state.unlockedAuras, ...parsed.unlockedAuras };
            }
            if (parsed.unlockedAchievements) {
                state.unlockedAchievements = { ...state.unlockedAchievements, ...parsed.unlockedAchievements };
            }
            if (parsed.upgrades) {
                state.upgrades.luck = parsed.upgrades.luck !== undefined ? parsed.upgrades.luck : state.upgrades.luck;
                state.upgrades.speed = parsed.upgrades.speed !== undefined ? parsed.upgrades.speed : state.upgrades.speed;
            }
            if (parsed.cosmetics) {
                state.cosmetics.equippedPlatform = parsed.cosmetics.equippedPlatform !== undefined ? parsed.cosmetics.equippedPlatform : state.cosmetics.equippedPlatform;
                state.cosmetics.equippedCharacter = parsed.cosmetics.equippedCharacter !== undefined ? parsed.cosmetics.equippedCharacter : state.cosmetics.equippedCharacter;
                if (parsed.cosmetics.unlockedPlatforms) {
                    state.cosmetics.unlockedPlatforms = [...parsed.cosmetics.unlockedPlatforms];
                }
                if (parsed.cosmetics.unlockedCharacters) {
                    state.cosmetics.unlockedCharacters = [...parsed.cosmetics.unlockedCharacters];
                }
            }
            if (parsed.settings) {
                state.settings = {
                    soundEnabled: parsed.settings.soundEnabled !== undefined ? parsed.settings.soundEnabled : true,
                    effectsEnabled: parsed.settings.effectsEnabled !== undefined ? parsed.settings.effectsEnabled : true,
                    auras: parsed.settings.auras !== undefined ? parsed.settings.auras : {}
                };
            } else {
                state.settings = {
                    soundEnabled: true,
                    effectsEnabled: true,
                    auras: {}
                };
            }
            sfx.muted = !state.settings.soundEnabled;
            localStorage.setItem("auraroll_muted", sfx.muted);
        } catch (e) {
            console.error("Failed to load save", e);
        }
    }
}

function saveState() {
    localStorage.setItem("auraroll_save", JSON.stringify(state));
}

function resetProgress() {
    state = {
        rolls: 0,
        coins: 0,
        equippedAura: null,
        unlockedAuras: {},
        unlockedAchievements: {},
        upgrades: { luck: 1, speed: 1 },
        potionLuckTime: 0,
        cosmetics: {
            equippedPlatform: "default",
            equippedCharacter: "default",
            unlockedPlatforms: ["default"],
            unlockedCharacters: ["default"]
        },
        settings: {
            soundEnabled: true,
            effectsEnabled: true,
            auras: {}
        }
    };
    sfx.muted = false;
    localStorage.setItem("auraroll_muted", "false");
    saveState();
    updateLanguageDOM();
    showStatus(TRANSLATIONS[currentLang].roll_status_ready);
}

// ==========================================================================
// 4.5 ACHIEVEMENTS SYSTEM
// ==========================================================================
const ACHIEVEMENTS = [
    // Common
    { id: "common_10", tier: "common", count: 10, name: { ru: "Обычный парень", en: "Regular Guy" }, desc: { ru: "Получить 10 обычных аур", en: "Obtain 10 Common auras" } },
    { id: "common_25", tier: "common", count: 25, name: { ru: "Обычный везунчик", en: "Common Lucky Guy" }, desc: { ru: "Получить 25 обычных аур", en: "Obtain 25 Common auras" } },
    { id: "common_50", tier: "common", count: 50, name: { ru: "Обычный мастер", en: "Common Master" }, desc: { ru: "Получить 50 обычных аур", en: "Obtain 50 Common auras" } },
    { id: "common_100", tier: "common", count: 100, name: { ru: "Самый обычный на земле", en: "Most Common on Earth" }, desc: { ru: "Получить 100 обычных аур", en: "Obtain 100 Common auras" } },

    // Uncommon
    { id: "uncommon_10", tier: "uncommon", count: 10, name: { ru: "Необыкновенно", en: "Uncommon indeed" }, desc: { ru: "Получить 10 необычных аур", en: "Obtain 10 Uncommon auras" } },
    { id: "uncommon_25", tier: "uncommon", count: 25, name: { ru: "Не каждый день встретишь", en: "Rare Sight" }, desc: { ru: "Получить 25 необычных аур", en: "Obtain 25 Uncommon auras" } },
    { id: "uncommon_50", tier: "uncommon", count: 50, name: { ru: "Почти редко", en: "Almost Rare" }, desc: { ru: "Получить 50 необычных аур", en: "Obtain 50 Uncommon auras" } },
    { id: "uncommon_100", tier: "uncommon", count: 100, name: { ru: "Самое что необычное", en: "Extremely Uncommon" }, desc: { ru: "Получить 100 необычных аур", en: "Obtain 100 Uncommon auras" } },

    // Rare
    { id: "rare_10", tier: "rare", count: 10, name: { ru: "Крайне редко", en: "Extremely Rare" }, desc: { ru: "Получить 10 редких аур", en: "Obtain 10 Rare auras" } },
    { id: "rare_25", tier: "rare", count: 25, name: { ru: "Более чем редко", en: "Beyond Rare" }, desc: { ru: "Получить 25 редких аур", en: "Obtain 25 Rare auras" } },
    { id: "rare_50", tier: "rare", count: 50, name: { ru: "Редкий артефакт", en: "Rare Artifact" }, desc: { ru: "Получить 50 редких аур", en: "Obtain 50 Rare auras" } },
    { id: "rare_100", tier: "rare", count: 100, name: { ru: "Самое редкое явление", en: "The Rarest Phenomenon" }, desc: { ru: "Получить 100 редких аур", en: "Obtain 100 Rare auras" } },

    // Malware
    { id: "malware_1", tier: "malware", count: 1, name: { ru: "Система Заражена", en: "System Infected" }, desc: { ru: "Получить Вредоносную Ауру (1/2500)", en: "Obtain the Malware Aura (1/2500)" } },

    // Demon
    { id: "demon_1", tier: "demon", count: 1, name: { ru: "Врата Ада", en: "Gates of Hell" }, desc: { ru: "Получить Демоническую Ауру (1/5000)", en: "Obtain the Demon Aura (1/5000)" } },

    // Angel
    { id: "angel_1", tier: "angel", count: 1, name: { ru: "Небесное Пришествие", en: "Heavenly Descent" }, desc: { ru: "Получить Ангельскую Ауру (1/7500)", en: "Obtain the Angel Aura (1/7500)" } },

    // Rarity Milestones
    { id: "rarity_100", tier: "legendary", count: 1, name: { ru: "Вполне нормально", en: "Pretty Normal" }, desc: { ru: "Выбить ауру 1/100", en: "Obtain a 1/100 rarity aura" } },
    { id: "rarity_500", tier: "relaxed", count: 1, name: { ru: "Очень хорошо", en: "Very Good" }, desc: { ru: "Выбить ауру 1/500", en: "Obtain a 1/500 rarity aura" } },
    { id: "rarity_1000", tier: "glitch", count: 1, name: { ru: "Везунчик", en: "Lucky One" }, desc: { ru: "Выбить ауру 1/1000", en: "Obtain a 1/1000 rarity aura" } },
    { id: "rarity_5000", tier: "demon", count: 1, name: { ru: "Счастливчик", en: "Fortunate One" }, desc: { ru: "Выбить ауру 1/5000", en: "Obtain a 1/5000 rarity aura" } },

    // Rolls
    { id: "rolls_100", tier: "rolls", count: 100, name: { ru: "Неплохое начало", en: "A Decent Start" }, desc: { ru: "Сделать 100 прокрутов", en: "Roll 100 times" } },
    { id: "rolls_250", tier: "rolls", count: 250, name: { ru: "Сидишь долго", en: "Staying a While" }, desc: { ru: "Сделать 250 прокрутов", en: "Roll 250 times" } },
    { id: "rolls_500", tier: "rolls", count: 500, name: { ru: "Я думаю это достаточно", en: "I Think That's Enough" }, desc: { ru: "Сделать 500 прокрутов", en: "Roll 500 times" } },
    { id: "rolls_1000", tier: "rolls", count: 1000, name: { ru: "Серьёзно, пора заканчивать.", en: "Seriously, Time to Stop." }, desc: { ru: "Сделать 1000 прокрутов", en: "Roll 1000 times" } },
    { id: "rolls_5000", tier: "rolls", count: 5000, name: { ru: "Зависимость", en: "Addiction" }, desc: { ru: "Сделать 5000 прокрутов", en: "Roll 5000 times" } },
    { id: "rolls_10000", tier: "rolls", count: 10000, name: { ru: "Кто ты, воин...?", en: "Who are you, warrior...?" }, desc: { ru: "Сделать 10000 прокрутов", en: "Roll 10000 times" } },

    // Secret Achievement
    { id: "kaweps", tier: "special", count: 15, name: { ru: "KAWEPS", en: "KAWEPS" }, desc: { ru: "Выбить все ауры в игре.", en: "Obtain all auras in the game." } },
    { id: "earth_1", tier: "earth", count: 1, name: { ru: "Повелитель Земли", en: "Lord of the Earth" }, desc: { ru: "Получить Земную Ауру (1/10000)", en: "Obtain the Earth Aura (1/10000)" } }
];

function checkAchievements() {
    let stateChanged = false;
    ACHIEVEMENTS.forEach(ach => {
        if (state.unlockedAchievements[ach.id]) return;

        let count = 0;
        if (ach.tier === "rolls") {
            count = state.rolls;
        } else if (ach.id === "kaweps") {
            count = AURAS.filter(aura => (state.unlockedAuras[aura.id] || 0) > 0).length;
        } else {
            count = state.unlockedAuras[ach.tier] || 0;
        }

        if (count >= ach.count) {
            state.unlockedAchievements[ach.id] = Date.now();
            stateChanged = true;

            if (ach.id === "kaweps") {
                // Unlock and equip Mellstroy skin
                if (!state.cosmetics.unlockedCharacters.includes("mellstroy")) {
                    state.cosmetics.unlockedCharacters.push("mellstroy");
                }
                state.cosmetics.equippedCharacter = "mellstroy";
            }

            showAchievementToast(ach);
            sfx.playAchievement();
        }
    });

    if (stateChanged) {
        saveState();
        renderAchievements();
        renderCosmetics();
    }
}

function showAchievementToast(ach) {
    let container = document.getElementById("toast-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        document.body.appendChild(container);
    }

    // Capping at maximum 3 notifications. Dismiss the oldest immediately with slide-out.
    const existing = container.querySelectorAll(".toast-achievement:not(.exit)");
    if (existing.length >= 3) {
        const oldest = existing[0];
        oldest.classList.add("exit");
        setTimeout(() => {
            oldest.remove();
        }, 400);
    }

    const toast = document.createElement("div");
    toast.className = "toast-achievement";

    const title = ach.name[currentLang];
    const header = TRANSLATIONS[currentLang].achievement_unlocked_toast;

    toast.innerHTML = `
        <i class="fa-solid fa-trophy toast-icon"></i>
        <div class="toast-content">
            <span class="toast-header">${header}</span>
            <span class="toast-name">${title}</span>
        </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        if (toast.parentNode) {
            toast.classList.add("exit");
            setTimeout(() => {
                toast.remove();
            }, 400);
        }
    }, 4000);
}

function renderAchievements() {
    const listEl = document.getElementById("achievements-list");
    if (!listEl) return;
    listEl.innerHTML = "";

    ACHIEVEMENTS.forEach(ach => {
        const isUnlocked = !!state.unlockedAchievements[ach.id];
        let count = ach.tier === "rolls" ? state.rolls : (ach.id === "kaweps" ? AURAS.filter(aura => (state.unlockedAuras[aura.id] || 0) > 0).length : (state.unlockedAuras[ach.tier] || 0));
        if (isUnlocked) {
            count = ach.count;
        }
        const progressPercent = Math.min(100, (count / ach.count) * 100);

        const card = document.createElement("div");
        card.className = `achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`;

        card.innerHTML = `
            <div class="achievement-title-row">
                <span class="achievement-title">${ach.name[currentLang]}</span>
                <i class="fa-solid ${isUnlocked ? 'fa-circle-check' : 'fa-lock'} achievement-status-icon"></i>
            </div>
            <p class="achievement-desc">${ach.desc[currentLang]}</p>
            <div class="achievement-progress-container">
                <div class="achievement-progress-bar">
                    <div class="achievement-progress-fill" style="width: ${progressPercent}%"></div>
                </div>
                <span class="achievement-progress-text">${count} / ${ach.count}</span>
            </div>
        `;

        listEl.appendChild(card);
    });
}


// ==========================================================================
// 5. AUDIO SYNTHESIS ENGINE
// ==========================================================================
class SoundEngine {
    constructor() {
        this.ctx = null;
        this.muted = localStorage.getItem("auraroll_muted") === "true";
    }

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.ctx.state === "suspended") {
            this.ctx.resume();
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        localStorage.setItem("auraroll_muted", this.muted);
        if (typeof state !== 'undefined' && state.settings) {
            state.settings.soundEnabled = !this.muted;
            saveState();
            const soundToggleEl = document.getElementById("settings-sound-toggle");
            if (soundToggleEl) {
                soundToggleEl.checked = state.settings.soundEnabled;
            }
        }
        return this.muted;
    }

    playClick() {
        if (this.muted) return;
        this.init();

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(800, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.1);

        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.1);
    }

    playSpin(duration) {
        if (this.muted) return;
        this.init();

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(120, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + duration);

        gain.gain.setValueAtTime(0.0, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }

    playUnlock(tier) {
        if (this.muted) return;
        this.init();

        const now = this.ctx.currentTime;
        const mainGain = this.ctx.createGain();
        mainGain.connect(this.ctx.destination);

        if (tier === "common" || tier === "uncommon") {
            // Short pop
            const osc = this.ctx.createOscillator();
            osc.type = "sine";
            osc.frequency.setValueAtTime(tier === "common" ? 300 : 400, now);
            osc.frequency.setValueAtTime(tier === "common" ? 450 : 600, now + 0.05);

            mainGain.gain.setValueAtTime(0.08, now);
            mainGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

            osc.connect(mainGain);
            osc.start();
            osc.stop(now + 0.15);

        } else if (tier === "rare" || tier === "epic") {
            // Pentatonic Arpeggio
            const freqs = tier === "rare" ? [261.6, 329.6, 392.0, 523.3] : [329.6, 415.3, 493.9, 659.3];
            mainGain.gain.setValueAtTime(0.08, now);
            mainGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

            freqs.forEach((f, i) => {
                const osc = this.ctx.createOscillator();
                const nodeGain = this.ctx.createGain();

                osc.type = "triangle";
                osc.frequency.setValueAtTime(f, now + i * 0.08);

                nodeGain.gain.setValueAtTime(0, now);
                nodeGain.gain.linearRampToValueAtTime(0.06, now + i * 0.08 + 0.02);
                nodeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

                osc.connect(nodeGain);
                nodeGain.connect(mainGain);
                osc.start(now + i * 0.08);
                osc.stop(now + 0.6);
            });

        } else if (tier === "wind") {
            // Resonant noise sweep (Wind simulation)
            const bufferSize = this.ctx.sampleRate * 1.0;
            const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }

            const noise = this.ctx.createBufferSource();
            noise.buffer = buffer;

            const filter = this.ctx.createBiquadFilter();
            filter.type = "bandpass";
            filter.Q.setValueAtTime(15, now);
            filter.frequency.setValueAtTime(100, now);
            filter.frequency.exponentialRampToValueAtTime(1200, now + 0.4);
            filter.frequency.exponentialRampToValueAtTime(300, now + 0.9);

            mainGain.gain.setValueAtTime(0.12, now);
            mainGain.gain.exponentialRampToValueAtTime(0.001, now + 1.0);

            noise.connect(filter);
            filter.connect(mainGain);

            noise.start(now);
            noise.stop(now + 1.0);

        } else if (tier === "water") {
            // Bubble splashing sounds
            mainGain.gain.setValueAtTime(0.1, now);
            mainGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

            for (let i = 0; i < 6; i++) {
                const osc = this.ctx.createOscillator();
                const popGain = this.ctx.createGain();
                const triggerTime = now + i * 0.15 + Math.random() * 0.05;

                osc.type = "sine";
                osc.frequency.setValueAtTime(150 + Math.random() * 100, triggerTime);
                osc.frequency.exponentialRampToValueAtTime(800 + Math.random() * 400, triggerTime + 0.12);

                popGain.gain.setValueAtTime(0, now);
                popGain.gain.setValueAtTime(0.08, triggerTime);
                popGain.gain.exponentialRampToValueAtTime(0.001, triggerTime + 0.12);

                osc.connect(popGain);
                popGain.connect(mainGain);
                osc.start(triggerTime);
                osc.stop(triggerTime + 0.12);
            }

        } else if (tier === "legendary") {
            // Epic chord build & impact sound
            const chords = [110, 165, 220, 330, 440, 550, 660]; // Massive detuned A minor / fifths

            mainGain.gain.setValueAtTime(0.15, now);
            mainGain.gain.linearRampToValueAtTime(0.2, now + 0.4);
            mainGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

            // Sub-drop
            const sub = this.ctx.createOscillator();
            const subGain = this.ctx.createGain();
            sub.type = "sine";
            sub.frequency.setValueAtTime(80, now);
            sub.frequency.exponentialRampToValueAtTime(30, now + 1.5);
            subGain.gain.setValueAtTime(0.2, now);
            subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
            sub.connect(subGain);
            subGain.connect(mainGain);
            sub.start(now);
            sub.stop(now + 1.5);

            chords.forEach((freq) => {
                const osc1 = this.ctx.createOscillator();
                const osc2 = this.ctx.createOscillator();
                const oscGain = this.ctx.createGain();

                osc1.type = "sawtooth";
                osc2.type = "square";

                // Detune slightly
                osc1.frequency.setValueAtTime(freq + Math.random() - 0.5, now);
                osc2.frequency.setValueAtTime(freq * 1.5 + Math.random() - 0.5, now);

                oscGain.gain.setValueAtTime(0.01, now);
                oscGain.gain.linearRampToValueAtTime(0.05, now + 0.3);
                oscGain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

                const filter = this.ctx.createBiquadFilter();
                filter.type = "lowpass";
                filter.frequency.setValueAtTime(200, now);
                filter.frequency.exponentialRampToValueAtTime(3000, now + 0.4);
                filter.frequency.exponentialRampToValueAtTime(100, now + 2.2);

                osc1.connect(filter);
                osc2.connect(filter);
                filter.connect(oscGain);
                oscGain.connect(mainGain);

                osc1.start(now);
                osc2.start(now);
                osc1.stop(now + 2.5);
                osc2.stop(now + 2.5);
            });
        } else if (tier === "emerald") {
            // Magical crystal bell chimes / emerald shimmer
            mainGain.gain.setValueAtTime(0.12, now);
            mainGain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);

            const freqs = [523.3, 659.3, 784.0, 1046.5, 1318.5]; // Pentatonic bells
            freqs.forEach((f, i) => {
                const osc = this.ctx.createOscillator();
                const noteGain = this.ctx.createGain();

                osc.type = "sine";
                osc.frequency.setValueAtTime(f, now + i * 0.12);

                noteGain.gain.setValueAtTime(0, now);
                noteGain.gain.linearRampToValueAtTime(0.06, now + i * 0.12 + 0.02);
                noteGain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.8);

                osc.connect(noteGain);
                noteGain.connect(mainGain);

                osc.start(now + i * 0.12);
                osc.stop(now + i * 0.12 + 0.8);
            });
        } else if (tier === "relaxed") {
            // Soft lullaby arpeggio with deep peaceful notes
            mainGain.gain.setValueAtTime(0.12, now);
            mainGain.gain.exponentialRampToValueAtTime(0.001, now + 3.0);

            const freqs = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99]; // C major gentle arpeggio
            freqs.forEach((f, i) => {
                const osc = this.ctx.createOscillator();
                const noteGain = this.ctx.createGain();

                osc.type = "sine";
                osc.frequency.setValueAtTime(f, now + i * 0.25); // slow spacing

                noteGain.gain.setValueAtTime(0, now);
                noteGain.gain.linearRampToValueAtTime(0.05, now + i * 0.25 + 0.1); // slow attack
                noteGain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.25 + 1.5); // long release

                osc.connect(noteGain);
                noteGain.connect(mainGain);

                osc.start(now + i * 0.25);
                osc.stop(now + i * 0.25 + 1.5);
            });
        } else if (tier === "nature") {
            // Nature Aura sound: Wood block/chimes and wind rustle
            mainGain.gain.setValueAtTime(0.14, now);
            mainGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

            // 1. Rustling leaves sound (filtered noise)
            const bufferSize = this.ctx.sampleRate * 1.5;
            const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }

            const noise = this.ctx.createBufferSource();
            noise.buffer = buffer;

            const filter = this.ctx.createBiquadFilter();
            filter.type = "bandpass";
            filter.Q.setValueAtTime(12, now);
            filter.frequency.setValueAtTime(800, now);
            filter.frequency.exponentialRampToValueAtTime(3000, now + 0.5);
            filter.frequency.exponentialRampToValueAtTime(600, now + 1.5);

            const noiseGain = this.ctx.createGain();
            noiseGain.gain.setValueAtTime(0.08, now);
            noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

            noise.connect(filter);
            filter.connect(noiseGain);
            noiseGain.connect(mainGain);
            noise.start(now);
            noise.stop(now + 1.5);

            // 2. Wooden notes (marimba/kalimba chords)
            const notes = [196.00, 246.94, 293.66, 392.00, 493.88]; // G major organic chord
            notes.forEach((f, i) => {
                const osc = this.ctx.createOscillator();
                const noteGain = this.ctx.createGain();
                const triggerTime = now + i * 0.12;

                // Mix sine (fundamental) and triangle (woody texture)
                osc.type = "triangle";
                osc.frequency.setValueAtTime(f, triggerTime);

                noteGain.gain.setValueAtTime(0, now);
                noteGain.gain.setValueAtTime(0.08, triggerTime);
                noteGain.gain.exponentialRampToValueAtTime(0.001, triggerTime + 0.8);

                osc.connect(noteGain);
                noteGain.connect(mainGain);
                osc.start(triggerTime);
                osc.stop(triggerTime + 0.8);
            });
        } else if (tier === "glitch") {
            // Glitch Aura Audio Synthesis
            mainGain.gain.setValueAtTime(0.18, now);
            mainGain.gain.exponentialRampToValueAtTime(0.001, now + 5.0);

            // 1. Initial hum & high-frequency digital glitch clicks (0s to 3.5s)
            for (let i = 0; i < 18; i++) {
                const clickTime = now + Math.random() * 3.5;
                const osc = this.ctx.createOscillator();
                const clickGain = this.ctx.createGain();

                osc.type = Math.random() < 0.5 ? "sawtooth" : "square";
                osc.frequency.setValueAtTime(Math.random() * 8000 + 1000, clickTime);
                osc.frequency.exponentialRampToValueAtTime(Math.random() * 100 + 40, clickTime + 0.08);

                clickGain.gain.setValueAtTime(0, now);
                clickGain.gain.setValueAtTime(0.04, clickTime);
                clickGain.gain.exponentialRampToValueAtTime(0.001, clickTime + 0.08);

                osc.connect(clickGain);
                clickGain.connect(mainGain);
                osc.start(clickTime);
                osc.stop(clickTime + 0.08);
            }

            // 2. Rising tension hum (3.0s to 4.2s)
            const tensionOsc = this.ctx.createOscillator();
            const tensionGain = this.ctx.createGain();
            tensionOsc.type = "sawtooth";
            tensionOsc.frequency.setValueAtTime(120, now + 2.2);
            tensionOsc.frequency.exponentialRampToValueAtTime(800, now + 4.2);

            tensionGain.gain.setValueAtTime(0, now);
            tensionGain.gain.linearRampToValueAtTime(0.06, now + 3.2);
            tensionGain.gain.exponentialRampToValueAtTime(0.001, now + 4.3);

            tensionOsc.connect(tensionGain);
            tensionGain.connect(mainGain);
            tensionOsc.start(now + 2.2);
            tensionOsc.stop(now + 4.3);

            // 3. Explosion Drop at 4.2s
            const expTime = now + 4.2;
            const subOsc = this.ctx.createOscillator();
            const subGain = this.ctx.createGain();
            subOsc.type = "sine";
            subOsc.frequency.setValueAtTime(150, expTime);
            subOsc.frequency.exponentialRampToValueAtTime(30, expTime + 0.8);

            subGain.gain.setValueAtTime(0, now);
            subGain.gain.setValueAtTime(0.35, expTime);
            subGain.gain.exponentialRampToValueAtTime(0.001, expTime + 0.8);

            subOsc.connect(subGain);
            subGain.connect(mainGain);
            subOsc.start(expTime);
            subOsc.stop(expTime + 0.8);

            // Noise burst for explosion
            const bufferSize = this.ctx.sampleRate * 0.8;
            const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }
            const noise = this.ctx.createBufferSource();
            noise.buffer = buffer;

            const expFilter = this.ctx.createBiquadFilter();
            expFilter.type = "lowpass";
            expFilter.frequency.setValueAtTime(1000, expTime);
            expFilter.frequency.exponentialRampToValueAtTime(100, expTime + 0.8);

            const expNoiseGain = this.ctx.createGain();
            expNoiseGain.gain.setValueAtTime(0, now);
            expNoiseGain.gain.setValueAtTime(0.25, expTime);
            expNoiseGain.gain.exponentialRampToValueAtTime(0.001, expTime + 0.8);

            noise.connect(expFilter);
            expFilter.connect(expNoiseGain);
            expNoiseGain.connect(mainGain);
            noise.start(expTime);
            noise.stop(expTime + 0.8);
        } else if (tier === "malware") {
            // Malware / Virus Sound: digital warning alarms and static glitch bursts
            mainGain.gain.setValueAtTime(0.16, now);
            mainGain.gain.exponentialRampToValueAtTime(0.001, now + 3.0);

            // 1. Alternating alarm beeps (warning alerts)
            const beepFreqs = [587.33, 440.0]; // D5 and A4 alarm notes
            for (let i = 0; i < 4; i++) {
                const triggerTime = now + i * 0.35;
                const osc = this.ctx.createOscillator();
                const beepGain = this.ctx.createGain();

                osc.type = "sawtooth";
                osc.frequency.setValueAtTime(beepFreqs[i % 2], triggerTime);

                // Frequency sweep (downward chirp)
                osc.frequency.linearRampToValueAtTime(beepFreqs[i % 2] - 100, triggerTime + 0.2);

                beepGain.gain.setValueAtTime(0, now);
                beepGain.gain.setValueAtTime(0.08, triggerTime);
                beepGain.gain.linearRampToValueAtTime(0.04, triggerTime + 0.05);
                beepGain.gain.exponentialRampToValueAtTime(0.001, triggerTime + 0.25);

                osc.connect(beepGain);
                beepGain.connect(mainGain);

                osc.start(triggerTime);
                osc.stop(triggerTime + 0.25);
            }

            // 2. Heavy digital click/static bursts (Trojan injection sound)
            const bufferSize = this.ctx.sampleRate * 0.4;
            const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }

            for (let j = 0; j < 3; j++) {
                const burstTime = now + 1.2 + j * 0.4;
                const noise = this.ctx.createBufferSource();
                noise.buffer = buffer;

                const filter = this.ctx.createBiquadFilter();
                filter.type = "bandpass";
                filter.frequency.setValueAtTime(1000 + Math.random() * 2000, burstTime);
                filter.Q.setValueAtTime(8, burstTime);

                const burstGain = this.ctx.createGain();
                burstGain.gain.setValueAtTime(0, now);
                burstGain.gain.setValueAtTime(0.08, burstTime);
                burstGain.gain.exponentialRampToValueAtTime(0.001, burstTime + 0.2);

                noise.connect(filter);
                filter.connect(burstGain);
                burstGain.connect(mainGain);

                noise.start(burstTime);
                noise.stop(burstTime + 0.2);
            }
        } else if (tier === "demon") {
            // Play custom audio file
            try {
                const audio = new Audio("ia-uzhe-krasnyi_KEJ9Cf9o.mp3");
                audio.volume = 0.65;
                audio.play().catch(e => console.error("Error playing custom audio:", e));
            } catch (err) {
                console.error("Audio failed:", err);
            }

            // Demon sound: fiery underworld portal, hellfire crackle, and explosive portal emergence.
            mainGain.gain.setValueAtTime(0.2, now);
            mainGain.gain.exponentialRampToValueAtTime(0.001, now + 4.5);

            // 1. Hellish low rumble (portal opening)
            const osc1 = this.ctx.createOscillator();
            const rumbleGain = this.ctx.createGain();
            osc1.type = "sawtooth";
            osc1.frequency.setValueAtTime(45, now);
            osc1.frequency.linearRampToValueAtTime(30, now + 2.0); // pitch drops down into the depths

            rumbleGain.gain.setValueAtTime(0.12, now);
            rumbleGain.gain.linearRampToValueAtTime(0.06, now + 1.5);
            rumbleGain.gain.exponentialRampToValueAtTime(0.001, now + 3.0);

            const rumbleFilter = this.ctx.createBiquadFilter();
            rumbleFilter.type = "lowpass";
            rumbleFilter.frequency.setValueAtTime(120, now);

            osc1.connect(rumbleFilter);
            rumbleFilter.connect(rumbleGain);
            rumbleGain.connect(mainGain);
            osc1.start(now);
            osc1.stop(now + 3.0);

            // 2. Rising pitch sweep (leaping out of portal at 2.5s)
            const osc2 = this.ctx.createOscillator();
            const sweepGain = this.ctx.createGain();
            osc2.type = "triangle";
            osc2.frequency.setValueAtTime(80, now + 2.3);
            osc2.frequency.exponentialRampToValueAtTime(600, now + 3.0);

            sweepGain.gain.setValueAtTime(0, now);
            sweepGain.gain.setValueAtTime(0.1, now + 2.3);
            sweepGain.gain.exponentialRampToValueAtTime(0.001, now + 3.2);

            osc2.connect(sweepGain);
            sweepGain.connect(mainGain);
            osc2.start(now + 2.3);
            osc2.stop(now + 3.2);

            // 3. Flame explosion / crackle bursts
            for (let i = 0; i < 5; i++) {
                const burstTime = now + 2.5 + i * 0.25;
                const oscBurst = this.ctx.createOscillator();
                const burstGain = this.ctx.createGain();

                oscBurst.type = "sawtooth";
                oscBurst.frequency.setValueAtTime(90 + Math.random() * 80, burstTime);
                oscBurst.frequency.exponentialRampToValueAtTime(20, burstTime + 0.3);

                const burstFilter = this.ctx.createBiquadFilter();
                burstFilter.type = "bandpass";
                burstFilter.frequency.setValueAtTime(250 + Math.random() * 200, burstTime);

                burstGain.gain.setValueAtTime(0, now);
                burstGain.gain.setValueAtTime(0.08, burstTime);
                burstGain.gain.exponentialRampToValueAtTime(0.001, burstTime + 0.3);

                oscBurst.connect(burstFilter);
                burstFilter.connect(burstGain);
                burstGain.connect(mainGain);

                oscBurst.start(burstTime);
                oscBurst.stop(burstTime + 0.35);
            }
        } else if (tier === "angel") {
            // Angel sound: holy celestial choir chord, glittering high bells, and soft wind sweep
            mainGain.gain.setValueAtTime(0.25, now);
            mainGain.gain.exponentialRampToValueAtTime(0.001, now + 5.5);

            // 1. Shimmering chord (major chord build)
            const chords = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // C Major scale harmonics
            chords.forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const nodeGain = this.ctx.createGain();

                osc.type = "sine";
                osc.frequency.setValueAtTime(freq, now + idx * 0.15);

                nodeGain.gain.setValueAtTime(0, now);
                nodeGain.gain.linearRampToValueAtTime(0.06, now + idx * 0.15 + 0.1);
                nodeGain.gain.exponentialRampToValueAtTime(0.001, now + 4.5);

                osc.connect(nodeGain);
                nodeGain.connect(mainGain);
                osc.start(now + idx * 0.15);
                osc.stop(now + 5.0);
            });

            // 2. Glittering bells (high frequency pings)
            for (let i = 0; i < 8; i++) {
                const bellTime = now + 1.2 + i * 0.4;
                const osc = this.ctx.createOscillator();
                const bellGain = this.ctx.createGain();

                osc.type = "triangle";
                osc.frequency.setValueAtTime(1200 + Math.random() * 800, bellTime);

                bellGain.gain.setValueAtTime(0, now);
                bellGain.gain.setValueAtTime(0.07, bellTime);
                bellGain.gain.exponentialRampToValueAtTime(0.001, bellTime + 0.3);

                osc.connect(bellGain);
                bellGain.connect(mainGain);
                osc.start(bellTime);
                osc.stop(bellTime + 0.3);
            }
        } else if (tier === "earth") {
            // Earth Aura Sound: Organic rumbling, rising tension, and a massive impact/sub drop at 5.4s
            mainGain.gain.setValueAtTime(0.25, now);
            mainGain.gain.exponentialRampToValueAtTime(0.001, now + 7.0);

            // 1. Initial crystal chime for the star (0s to 1.5s)
            const chimes = [392.00, 523.25, 659.25, 783.99]; // G C E G
            chimes.forEach((f, i) => {
                const osc = this.ctx.createOscillator();
                const chimeGain = this.ctx.createGain();
                osc.type = "sine";
                osc.frequency.setValueAtTime(f, now + i * 0.15);
                chimeGain.gain.setValueAtTime(0, now);
                chimeGain.gain.linearRampToValueAtTime(0.05, now + i * 0.15 + 0.05);
                chimeGain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.15 + 1.2);
                osc.connect(chimeGain);
                chimeGain.connect(mainGain);
                osc.start(now + i * 0.15);
                osc.stop(now + i * 0.15 + 1.2);
            });

            // 2. Low organic rumble (rising pitch/tension from 1.5s to 5.4s)
            const rumbleOsc = this.ctx.createOscillator();
            const rumbleGain = this.ctx.createGain();
            const rumbleFilter = this.ctx.createBiquadFilter();
            rumbleOsc.type = "triangle";
            rumbleOsc.frequency.setValueAtTime(60, now + 1.5);
            rumbleOsc.frequency.exponentialRampToValueAtTime(180, now + 5.4);

            rumbleGain.gain.setValueAtTime(0, now);
            rumbleGain.gain.linearRampToValueAtTime(0.1, now + 2.5);
            rumbleGain.gain.exponentialRampToValueAtTime(0.001, now + 5.5);

            rumbleFilter.type = "lowpass";
            rumbleFilter.frequency.setValueAtTime(150, now);

            rumbleOsc.connect(rumbleFilter);
            rumbleFilter.connect(rumbleGain);
            rumbleGain.connect(mainGain);
            rumbleOsc.start(now + 1.5);
            rumbleOsc.stop(now + 5.5);

            // 3. Massive Stone Impact explosion at 5.4s
            const impactTime = now + 5.4;
            // Sub drop
            const subOsc = this.ctx.createOscillator();
            const subGain = this.ctx.createGain();
            subOsc.type = "sine";
            subOsc.frequency.setValueAtTime(120, impactTime);
            subOsc.frequency.exponentialRampToValueAtTime(25, impactTime + 1.2);

            subGain.gain.setValueAtTime(0, now);
            subGain.gain.setValueAtTime(0.4, impactTime);
            subGain.gain.exponentialRampToValueAtTime(0.001, impactTime + 1.2);

            subOsc.connect(subGain);
            subGain.connect(mainGain);
            subOsc.start(impactTime);
            subOsc.stop(impactTime + 1.2);

            // Heavy lowpass noise burst representing stone smash
            const bufferSize = this.ctx.sampleRate * 1.5;
            const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }
            const noise = this.ctx.createBufferSource();
            noise.buffer = buffer;

            const expFilter = this.ctx.createBiquadFilter();
            expFilter.type = "lowpass";
            expFilter.frequency.setValueAtTime(600, impactTime);
            expFilter.frequency.exponentialRampToValueAtTime(60, impactTime + 1.5);

            const expNoiseGain = this.ctx.createGain();
            expNoiseGain.gain.setValueAtTime(0, now);
            expNoiseGain.gain.setValueAtTime(0.35, impactTime);
            expNoiseGain.gain.exponentialRampToValueAtTime(0.001, impactTime + 1.5);

            noise.connect(expFilter);
            expFilter.connect(expNoiseGain);
            expNoiseGain.connect(mainGain);
            noise.start(impactTime);
            noise.stop(impactTime + 1.5);
        }
    }

    playAchievement() {
        if (this.muted) return;
        this.init();
        const now = this.ctx.currentTime;
        const mainGain = this.ctx.createGain();
        mainGain.connect(this.ctx.destination);
        mainGain.gain.setValueAtTime(0.08, now);
        mainGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

        const freqs = [440.0, 554.37, 659.25, 880.0, 1108.73]; // A major sparkle
        freqs.forEach((f, i) => {
            const osc = this.ctx.createOscillator();
            const noteGain = this.ctx.createGain();

            osc.type = "triangle";
            osc.frequency.setValueAtTime(f, now + i * 0.05);

            noteGain.gain.setValueAtTime(0, now);
            noteGain.gain.linearRampToValueAtTime(0.05, now + i * 0.05 + 0.01);
            noteGain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.4);

            osc.connect(noteGain);
            noteGain.connect(mainGain);

            osc.start(now + i * 0.05);
            osc.stop(now + i * 0.05 + 0.4);
        });
    }
}

const sfx = new SoundEngine();


// ==========================================================================
// 6. CANVAS RENDERING ENGINE (2D Particles & Platform)
// ==========================================================================
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const container = document.getElementById("canvas-container");

// Dynamic Resize
function resizeCanvas() {
    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Screen Shake variables
let shakeIntensity = 0;
let shakeDecay = 0.92;

function triggerShake(intensity) {
    shakeIntensity = intensity;
}

// Particle System
class Particle {
    constructor(x, y, color, options = {}) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.vx = options.vx !== undefined ? options.vx : (Math.random() * 2 - 1);
        this.vy = options.vy !== undefined ? options.vy : (Math.random() * -2 - 1);
        this.alpha = options.alpha !== undefined ? options.alpha : 1;
        this.size = options.size !== undefined ? options.size : (Math.random() * 4 + 2);
        this.decay = options.decay !== undefined ? options.decay : (Math.random() * 0.015 + 0.01);
        this.gravity = options.gravity !== undefined ? options.gravity : 0;
        this.shape = options.shape || "circle"; // circle, star, ripple, leaf, drop
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() * 0.1 - 0.05);
        this.growth = options.growth || 0;
        this.maxSize = options.maxSize || 50;
        this.customDraw = options.customDraw || null;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.alpha -= this.decay;
        this.size += this.growth;
        this.rotation += this.rotSpeed;
        if (this.size > this.maxSize) this.size = this.maxSize;
        if (this.size < 0) this.size = 0;
    }

    draw(c) {
        c.save();
        c.globalAlpha = Math.max(0, this.alpha);
        c.translate(this.x, this.y);
        c.rotate(this.rotation);

        if (this.customDraw) {
            this.customDraw(c, this.size, this.color);
        } else if (this.shape === "circle") {
            c.beginPath();
            c.arc(0, 0, this.size, 0, Math.PI * 2);
            c.fillStyle = this.color;
            c.fill();
        } else if (this.shape === "star") {
            drawStar(c, 0, 0, 5, this.size, this.size / 2.5, this.color);
        } else if (this.shape === "ripple") {
            c.beginPath();
            c.ellipse(0, 0, this.size * 2, this.size * 0.8, 0, 0, Math.PI * 2);
            c.strokeStyle = this.color;
            c.lineWidth = 2;
            c.stroke();
        } else if (this.shape === "leaf") {
            c.beginPath();
            c.moveTo(0, -this.size);
            c.quadraticCurveTo(this.size * 0.8, 0, 0, this.size);
            c.quadraticCurveTo(-this.size * 0.8, 0, 0, -this.size);
            c.fillStyle = this.color;
            c.fill();
        } else if (this.shape === "drop") {
            c.beginPath();
            c.moveTo(0, -this.size);
            c.quadraticCurveTo(this.size, this.size * 0.5, 0, this.size);
            c.quadraticCurveTo(-this.size, this.size * 0.5, 0, -this.size);
            c.fillStyle = this.color;
            c.fill();
        } else if (this.shape === "zzz") {
            c.fillStyle = this.color;
            c.font = `bold ${Math.round(this.size)}px var(--font-ui)`;
            c.fillText("Z", 0, 0);
        }
        c.restore();
    }
}

// Utility to draw a star
function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius, color) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
}

function drawStarRevealAnimation(c, cx, cy, elapsed, color) {
    if (elapsed < 1500) {
        c.save();
        const progress = elapsed / 1500;
        const scale = Math.sin(progress * Math.PI / 2);
        const rotation = elapsed * 0.005;
        
        c.translate(cx, cy);
        c.rotate(rotation);
        
        c.shadowColor = color;
        c.shadowBlur = 30 * scale;
        
        drawStar(c, 0, 0, 8, 45 * scale, 20 * scale, color);
        drawStar(c, 0, 0, 8, 20 * scale, 8 * scale, "#ffffff");
        
        c.restore();
    }
}

function drawRock(c, rx, ry, rSize) {
    c.save();
    c.fillStyle = "#854d0e";
    c.strokeStyle = "#451a03";
    c.lineWidth = 1.5;
    c.beginPath();
    c.moveTo(rx - rSize, ry);
    c.lineTo(rx - rSize * 0.5, ry - rSize * 0.8);
    c.lineTo(rx + rSize * 0.5, ry - rSize * 0.7);
    c.lineTo(rx + rSize, ry);
    c.lineTo(rx + rSize * 0.4, ry + rSize * 0.8);
    c.lineTo(rx - rSize * 0.6, ry + rSize * 0.7);
    c.closePath();
    c.fill();
    c.stroke();
    c.restore();
}

function drawEarthCharacter(c, x, y, elapsed, skin) {
    const torsoY = y - 14;
    const neckY = y - 56;
    const headY = y - 68;
    const headRadius = 10;

    c.save();
    c.strokeStyle = skin.color;
    c.lineWidth = 5.5;
    c.lineCap = "round";
    c.lineJoin = "round";

    c.beginPath();
    c.moveTo(x, torsoY);
    c.lineTo(x - 12, y - 5);
    c.lineTo(x - 16, y);
    c.moveTo(x, torsoY);
    c.lineTo(x + 12, y - 5);
    c.lineTo(x + 16, y);
    c.stroke();

    c.beginPath();
    c.moveTo(x, torsoY);
    c.lineTo(x, neckY);
    c.stroke();

    c.beginPath();
    const armSwing = earthAnimationActive ? 0 : Math.sin(Date.now() * 0.002) * 4;
    c.moveTo(x, neckY + 8);
    c.lineTo(x - 18, neckY + 20 + armSwing);
    c.lineTo(x - 14, neckY + 38 + armSwing * 0.5);
    c.moveTo(x, neckY + 8);
    c.lineTo(x + 18, neckY + 20 - armSwing);
    c.lineTo(x + 14, neckY + 38 - armSwing * 0.5);
    c.stroke();

    if (elapsed >= 4000) {
        let rockScale = 1.0;
        if (earthAnimationActive && elapsed < 4800) {
            rockScale = (elapsed - 4000) / 800;
        }
        
        if (rockScale > 0) {
            const sizeArms = 4 * rockScale;
            const sizeLegs = 5 * rockScale;
            drawRock(c, x - 18, neckY + 20 + armSwing, sizeArms);
            drawRock(c, x - 14, neckY + 38 + armSwing * 0.5, sizeArms);
            drawRock(c, x + 18, neckY + 20 - armSwing, sizeArms);
            drawRock(c, x + 14, neckY + 38 - armSwing * 0.5, sizeArms);
            drawRock(c, x - 12, y - 5, sizeLegs);
            drawRock(c, x - 16, y, sizeLegs);
            drawRock(c, x + 12, y - 5, sizeLegs);
            drawRock(c, x + 16, y, sizeLegs);
        }
    }

    if (elapsed >= 3200) {
        let mtProgress = 1.0;
        if (earthAnimationActive && elapsed < 4000) {
            mtProgress = (elapsed - 3200) / 800;
        }
        
        if (mtProgress > 0) {
            c.save();
            c.fillStyle = "#78350f";
            c.beginPath();
            c.moveTo(x - 14, neckY + 14);
            c.lineTo(x - 8, neckY + 14 - 12 * mtProgress);
            c.lineTo(x - 2, neckY + 14);
            c.closePath();
            c.fill();
            c.fillStyle = "#ffffff";
            c.beginPath();
            c.moveTo(x - 10, neckY + 14 - 8 * mtProgress);
            c.lineTo(x - 8, neckY + 14 - 12 * mtProgress);
            c.lineTo(x - 6, neckY + 14 - 8 * mtProgress);
            c.closePath();
            c.fill();

            c.fillStyle = "#78350f";
            c.beginPath();
            c.moveTo(x + 2, neckY + 14);
            c.lineTo(x + 8, neckY + 14 - 12 * mtProgress);
            c.lineTo(x + 14, neckY + 14);
            c.closePath();
            c.fill();
            c.fillStyle = "#ffffff";
            c.beginPath();
            c.moveTo(x + 6, neckY + 14 - 8 * mtProgress);
            c.lineTo(x + 8, neckY + 14 - 12 * mtProgress);
            c.lineTo(x + 10, neckY + 14 - 8 * mtProgress);
            c.closePath();
            c.fill();
            c.restore();
        }
    }

    if (elapsed >= 4800) {
        let stoneProgress = 1.0;
        let stoneYOffset = 0;
        if (earthAnimationActive && elapsed < 5400) {
            const dropRatio = (elapsed - 4800) / 600;
            stoneProgress = dropRatio;
            stoneYOffset = -50 * (1 - dropRatio);
        }

        if (stoneProgress > 0) {
            c.save();
            c.translate(0, stoneYOffset);
            
            c.fillStyle = "#6b7280";
            c.strokeStyle = "#374151";
            c.lineWidth = 2;
            c.beginPath();
            c.moveTo(x - 10, neckY + 12);
            c.lineTo(x + 10, neckY + 12);
            c.lineTo(x + 8, neckY + 32);
            c.lineTo(x, neckY + 40);
            c.lineTo(x - 8, neckY + 32);
            c.closePath();
            c.fill();
            c.stroke();

            c.strokeStyle = "#1f2937";
            c.lineWidth = 1;
            c.beginPath();
            c.moveTo(x - 4, neckY + 18);
            c.lineTo(x + 2, neckY + 24);
            c.lineTo(x - 2, neckY + 30);
            c.stroke();
            
            c.restore();
        }
    }

    c.fillStyle = skin.color;
    c.beginPath();
    c.arc(x, headY, headRadius, 0, Math.PI * 2);
    c.fill();

    if (elapsed >= 1500) {
        const blueAlpha = earthAnimationActive ? Math.min(1, (elapsed - 1500) / 800) : 1;
        c.save();
        c.globalAlpha = blueAlpha;
        c.fillStyle = "#1e40af";
        c.beginPath();
        c.arc(x, headY, headRadius, 0, Math.PI * 2);
        c.fill();
        c.restore();
    }

    if (elapsed >= 2300) {
        let contProgress = 1.0;
        if (earthAnimationActive && elapsed < 3200) {
            contProgress = (elapsed - 2300) / 900;
        }
        
        if (contProgress > 0) {
            c.save();
            c.beginPath();
            c.arc(x, headY, headRadius, 0, Math.PI * 2);
            c.clip();

            c.fillStyle = "#16a34a";
            c.globalAlpha = contProgress;
            
            c.beginPath();
            c.arc(x - 3, headY - 2, 5 * contProgress, 0, Math.PI * 2);
            c.fill();

            c.beginPath();
            c.arc(x + 4, headY + 3, 4 * contProgress, 0, Math.PI * 2);
            c.fill();

            c.beginPath();
            c.arc(x + 2, headY - 5, 3 * contProgress, 0, Math.PI * 2);
            c.fill();

            c.beginPath();
            c.arc(x - 5, headY + 5, 3 * contProgress, 0, Math.PI * 2);
            c.fill();

            c.restore();
        }
    }

    c.restore();
}

let particles = [];
let windCurves = []; // Helper for wind spirals

// Stickman Animation State
let characterBob = 0;
let jumpHeight = 0;
let jumpVelocity = 0;

// Legendary Aura Reveal Animation State
let legendaryAnimationActive = false;
let legendaryAnimationTimer = 0;
let legendaryHasShaken = false;

// Emerald Aura Reveal Animation State
let emeraldAnimationActive = false;
let emeraldAnimationTimer = 0;
let emeraldHasTriggered = false;

// Relaxed Aura Reveal Animation State
let relaxedAnimationActive = false;
let relaxedAnimationTimer = 0;
let relaxedHasTriggered = false;

// Nature Aura Reveal Animation State
let natureAnimationActive = false;
let natureAnimationTimer = 0;
let natureHasTriggered = false;

// Glitch Aura Reveal Animation State
let glitchAnimationActive = false;
let glitchAnimationTimer = 0;
let glitchHasTriggered = false;

// Malware Aura Reveal Animation State
let malwareAnimationActive = false;
let malwareAnimationTimer = 0;
let malwareHasTriggered = false;

// Demon Aura Reveal Animation State
let demonAnimationActive = false;
let demonAnimationTimer = 0;
let demonHasTriggered = false;

// Angel Aura Reveal Animation State
let angelAnimationActive = false;
let angelAnimationTimer = 0;
let angelHasTriggered = false;

// Earth Aura Reveal Animation State
let earthAnimationActive = false;
let earthAnimationTimer = 0;
let earthHasTriggered = false;


// Main animation loop
function animate(timestamp) {
    requestAnimationFrame(animate);

    if (state.settings && !state.settings.effectsEnabled) {
        particles = [];
    }

    // Clear with slight alpha decay for path tails, but keep background clean
    const w = canvas.width / (window.devicePixelRatio || 1);
    const h = canvas.height / (window.devicePixelRatio || 1);

    ctx.clearRect(0, 0, w, h);

    // Handle Screen Shake
    ctx.save();
    if (shakeIntensity > 0.1) {
        const dx = (Math.random() - 0.5) * shakeIntensity;
        const dy = (Math.random() - 0.5) * shakeIntensity;
        ctx.translate(dx, dy);
        shakeIntensity *= shakeDecay;
    }

    let angelLightIntensity = 0;
    let angelGoldShift = 0;

    // Coordinates for Platform and Human
    const platformX = w / 2;
    const platformY = h * 0.68;
    const charX = platformX;
    const charY = platformY - 8 - jumpHeight;

    // Upgrades/breathing rates
    characterBob = Math.sin(timestamp * 0.0035) * 2.5;

    // Update Jump Physics
    const maxJumpHeight = h * 0.45; // Cap: no more than 45% of canvas height
    if (jumpHeight > 0 || jumpVelocity !== 0) {
        jumpHeight += jumpVelocity;
        jumpVelocity -= 0.6; // Gravity
        if (jumpHeight >= maxJumpHeight) {
            jumpHeight = maxJumpHeight;
            jumpVelocity = 0; // Stop upward momentum at ceiling
        }
        if (jumpHeight <= 0) {
            jumpHeight = 0;
            jumpVelocity = 0;
        }
    }

    // Check Legendary Animation Events
    if (legendaryAnimationActive) {
        const elapsed = Date.now() - legendaryAnimationTimer;
        if (elapsed >= 1000 && !legendaryHasShaken) {
            legendaryHasShaken = true;
            triggerShake(35);
            // Spawn a massive burst of golden star particles
            for (let i = 0; i < 40; i++) {
                particles.push(new Particle(
                    charX, charY - 30,
                    "#fbbf24",
                    {
                        vx: (Math.random() - 0.5) * 8,
                        vy: -Math.random() * 8 - 2,
                        size: Math.random() * 8 + 4,
                        shape: "star",
                        decay: 0.02
                    }
                ));
            }
            // Trigger floating name label display update
            updateUI();
        }
        if (elapsed > 3000) {
            legendaryAnimationActive = false;
        }
    }

    // Check Emerald Animation Events
    if (emeraldAnimationActive) {
        const elapsed = Date.now() - emeraldAnimationTimer;
        if (elapsed >= 2200 && !emeraldHasTriggered) {
            emeraldHasTriggered = true;
            triggerShake(35);
            // Spawn a massive burst of emerald star particles around the raised hand
            const handX = charX + 16;
            const handY = charY - 72 + characterBob;
            for (let i = 0; i < 40; i++) {
                particles.push(new Particle(
                    handX, handY,
                    "#10b981",
                    {
                        vx: (Math.random() - 0.5) * 9,
                        vy: -Math.random() * 8 - 1,
                        size: Math.random() * 7 + 3,
                        shape: "star",
                        decay: 0.02
                    }
                ));
            }
            // Trigger floating name label display update
            updateUI();
        }
        if (elapsed > 3500) {
            emeraldAnimationActive = false;
        }
    }

    // Check Relaxed Animation Events
    if (relaxedAnimationActive) {
        const elapsed = Date.now() - relaxedAnimationTimer;
        if (elapsed >= 2800 && !relaxedHasTriggered) {
            relaxedHasTriggered = true;
            // Spawn a burst of sleep stars and Zzzs above the sleeping character
            for (let i = 0; i < 20; i++) {
                particles.push(new Particle(
                    charX - 20, charY - 20,
                    "#a5f3fc",
                    {
                        vx: (Math.random() - 0.5) * 3,
                        vy: -Math.random() * 2 - 1,
                        size: 6,
                        growth: 0.1,
                        maxSize: 12,
                        shape: "zzz",
                        decay: 0.01
                    }
                ));
            }
            // Trigger floating name label display update
            updateUI();
        }
        if (elapsed > 4000) {
            relaxedAnimationActive = false;
        }
    }

    // Check Nature Animation Events
    if (natureAnimationActive) {
        const elapsed = Date.now() - natureAnimationTimer;
        if (elapsed >= 2500 && !natureHasTriggered) {
            natureHasTriggered = true;
            triggerShake(45); // intense screen shake

            // Spawn a massive burst of green leaves/petals and bright neon particles
            for (let i = 0; i < 50; i++) {
                particles.push(new Particle(
                    charX, charY - 30,
                    Math.random() < 0.5 ? "#22c55e" : "#39ff14",
                    {
                        vx: (Math.random() - 0.5) * 11,
                        vy: -Math.random() * 9 - 2,
                        size: Math.random() * 8 + 4,
                        shape: "leaf",
                        decay: 0.018
                    }
                ));
            }
            // Trigger floating name label display update
            updateUI();
        }
        if (elapsed > 4000) {
            natureAnimationActive = false;
        }
    }

    // Check Glitch Animation Events
    if (glitchAnimationActive) {
        const elapsed = Date.now() - glitchAnimationTimer;
        if (elapsed >= 4200 && !glitchHasTriggered) {
            glitchHasTriggered = true;
            triggerShake(70);

            // Spawn massive digital glitch block particles
            for (let i = 0; i < 60; i++) {
                particles.push(new Particle(
                    charX, charY - 30,
                    ["#00ffcc", "#ff0055", "#0055ff", "#ffffff", "#ffcc00"][Math.floor(Math.random() * 5)],
                    {
                        vx: (Math.random() - 0.5) * 16,
                        vy: (Math.random() - 0.5) * 16,
                        size: Math.random() * 16 + 6,
                        decay: 0.02,
                        customDraw: function (c, size, color) {
                            c.fillStyle = color;
                            c.fillRect(-size / 2, -size / 4, size, size / 2);
                        }
                    }
                ));
            }
            updateUI();
        }
        if (elapsed > 5000) {
            glitchAnimationActive = false;
        }
    }

    // Check Malware Animation Events
    if (malwareAnimationActive) {
        const elapsed = Date.now() - malwareAnimationTimer;
        if (elapsed >= 1200 && elapsed < 3500) {
            if (Math.random() < 0.25) {
                triggerShake(18);
            }
        }
        if (elapsed >= 3500 && !malwareHasTriggered) {
            malwareHasTriggered = true;
            triggerShake(65);

            // Spawn massive digital red/green binary and pixel particles
            for (let i = 0; i < 55; i++) {
                particles.push(new Particle(
                    charX, charY - 30,
                    Math.random() < 0.5 ? "#ff0055" : "#00ff66",
                    {
                        vx: (Math.random() - 0.5) * 15,
                        vy: (Math.random() - 0.5) * 15,
                        size: Math.random() * 5 + 3,
                        decay: 0.025,
                        customDraw: function (c, size, color) {
                            c.fillStyle = color;
                            c.fillRect(-size / 2, -size / 2, size, size);
                        }
                    }
                ));
            }
            updateUI();
        }
        if (elapsed > 4500) {
            malwareAnimationActive = false;
        }
    }

    // Check Demon Animation Events
    if (demonAnimationActive) {
        const elapsed = Date.now() - demonAnimationTimer;

        // Spawn fiery portal particles at the feet (charX, platformY)
        let portalScale = 0;
        if (elapsed < 800) {
            portalScale = elapsed / 800;
        } else if (elapsed < 3500) {
            portalScale = 1.0;
        } else if (elapsed < 4500) {
            portalScale = Math.max(0, 1 - (elapsed - 3500) / 1000);
        }

        if (portalScale > 0) {
            const numSparks = Math.random() < 0.4 ? 2 : 1;
            for (let i = 0; i < numSparks; i++) {
                const angle = Math.random() * Math.PI * 2;
                const dist = Math.random() * 50 * portalScale;
                const px = charX + Math.cos(angle) * dist;
                const py = platformY + Math.sin(angle) * 12; // elliptical portal

                particles.push(new Particle(
                    px, py,
                    Math.random() < 0.3 ? "#ffcc00" : (Math.random() < 0.6 ? "#ff6600" : "#ff0000"),
                    {
                        vx: (Math.random() - 0.5) * 1.5,
                        vy: -Math.random() * 3.5 - 1.5,
                        size: Math.random() * 4 + 2,
                        decay: 0.02
                    }
                ));
            }
        }

        // Trigger leap at 2.5s
        if (elapsed >= 2500 && !demonHasTriggered) {
            demonHasTriggered = true;
            jumpVelocity = 8.0; // Dramatic leap (capped by maxJumpHeight)
            triggerShake(50);

            // Spawn massive explosion of fire particles
            for (let i = 0; i < 60; i++) {
                particles.push(new Particle(
                    charX, platformY,
                    Math.random() < 0.4 ? "#ffaa00" : "#ff3300",
                    {
                        vx: (Math.random() - 0.5) * 16,
                        vy: -Math.random() * 12 - 4,
                        size: Math.random() * 7 + 3,
                        decay: 0.02
                    }
                ));
            }
            updateUI();
        }

        if (elapsed > 4500) {
            demonAnimationActive = false;
        }
    }

    // Check Angel Animation Events
    if (angelAnimationActive) {
        const elapsed = Date.now() - angelAnimationTimer;

        // Spawn falling golden/white sparkles inside the holy light beam
        if (Math.random() < 0.35) {
            particles.push(new Particle(
                charX + (Math.random() * 100 - 50),
                0,
                Math.random() < 0.3 ? "#ffffff" : "#fef08a",
                {
                    vx: Math.random() * 0.4 - 0.2,
                    vy: Math.random() * 2.5 + 2.0,
                    size: Math.random() * 4 + 2,
                    shape: "star",
                    decay: 0.012
                }
            ));
        }

        // Trigger UI update once descending from heaven at 3.0s
        if (elapsed >= 3000 && !angelHasTriggered) {
            angelHasTriggered = true;
            updateUI();
        }

        if (elapsed > 5500) {
            angelAnimationActive = false;
        }
    }

    // Check Earth Animation Events
    if (earthAnimationActive) {
        const elapsed = Date.now() - earthAnimationTimer;
        
        // Spawn stone debris during the drop phase or when it lands
        if (elapsed >= 4800 && elapsed < 5400) {
            if (Math.random() < 0.15) {
                particles.push(new Particle(
                    charX + (Math.random() * 40 - 20),
                    charY - 60,
                    "#6b7280",
                    {
                        vx: Math.random() * 0.4 - 0.2,
                        vy: Math.random() * 2 + 1,
                        size: Math.random() * 3 + 1,
                        decay: 0.03
                    }
                ));
            }
        }

        // Trigger major splash at 5400ms
        if (elapsed >= 5400 && !earthHasTriggered) {
            earthHasTriggered = true;
            triggerShake(60); // Strong impact shake!
            
            // Spawn massive explosion of stone debris, dirt, green leaves, and blue magic sparks
            for (let i = 0; i < 35; i++) {
                particles.push(new Particle(
                    charX, charY - 30,
                    Math.random() < 0.5 ? "#6b7280" : "#854d0e",
                    {
                        vx: (Math.random() - 0.5) * 12,
                        vy: -Math.random() * 8 - 3,
                        size: Math.random() * 6 + 3,
                        decay: 0.02
                    }
                ));
            }
            for (let i = 0; i < 25; i++) {
                particles.push(new Particle(
                    charX, charY - 30,
                    "#16a34a",
                    {
                        vx: (Math.random() - 0.5) * 10,
                        vy: -Math.random() * 6 - 2,
                        size: Math.random() * 6 + 3,
                        shape: "leaf",
                        decay: 0.015
                    }
                ));
            }
            for (let i = 0; i < 30; i++) {
                particles.push(new Particle(
                    charX, charY - 30,
                    "#3b82f6",
                    {
                        vx: (Math.random() - 0.5) * 14,
                        vy: -Math.random() * 10 - 2,
                        size: Math.random() * 5 + 2,
                        shape: "star",
                        decay: 0.02
                    }
                ));
            }

            updateUI();
        }

        if (elapsed > 6000) {
            earthAnimationActive = false;
        }
    }

    // 1. Draw Background Stars/Glows
    drawBackgroundStars(w, h, timestamp);

    // 2. Generate and Update Particles based on Equipped Aura
    if (state.equippedAura) {
        generateAuraParticles(charX, charY, timestamp);
    }

    // Update and draw background/underneath particles
    particles = particles.filter(p => p.alpha > 0.01);
    particles.forEach(p => {
        if (p.shape === "ripple") {
            p.update();
            p.draw(ctx);
        }
    });

    // 3. Draw Platform
    drawPlatform(ctx, platformX, platformY);

    if (demonAnimationActive) {
        const elapsed = Date.now() - demonAnimationTimer;
        drawDemonPortal(ctx, platformX, platformY, elapsed);
    } else if (state.equippedAura === "demon") {
        drawDemonPortal(ctx, platformX, platformY, Date.now());
    }

    // Calculate background dimming alpha for Glitch & Malware reveal cutscenes
    let dimBgAlpha = 0;
    let malwareRedShift = 0;
    let demonFireShift = 0;
    if (glitchAnimationActive) {
        const elapsed = Date.now() - glitchAnimationTimer;
        if (elapsed < 1500) {
            dimBgAlpha = elapsed / 1500;
        } else if (elapsed < 4200) {
            dimBgAlpha = 1.0;
        } else if (elapsed < 5000) {
            dimBgAlpha = 1.0 - (elapsed - 4200) / 800;
        }
    } else if (malwareAnimationActive) {
        const elapsed = Date.now() - malwareAnimationTimer;
        if (elapsed < 1200) {
            dimBgAlpha = (elapsed / 1200) * 0.8;
            malwareRedShift = (elapsed / 1200) * 0.15;
        } else if (elapsed < 3500) {
            dimBgAlpha = 0.8;
            malwareRedShift = 0.15 + Math.sin(timestamp * 0.02) * 0.05; // pulsating red tint
        } else if (elapsed < 4500) {
            dimBgAlpha = 0.8 * (1 - (elapsed - 3500) / 1000);
            malwareRedShift = 0.15 * (1 - (elapsed - 3500) / 1000);
        }
    } else if (demonAnimationActive) {
        const elapsed = Date.now() - demonAnimationTimer;
        if (elapsed < 1500) {
            dimBgAlpha = (elapsed / 1500) * 0.85;
            demonFireShift = (elapsed / 1500) * 0.25;
        } else if (elapsed < 3500) {
            dimBgAlpha = 0.85;
            demonFireShift = 0.25 + Math.sin(timestamp * 0.015) * 0.08;
        } else if (elapsed < 4500) {
            dimBgAlpha = 0.85 * (1 - (elapsed - 3500) / 1000);
            demonFireShift = 0.25 * (1 - (elapsed - 3500) / 1000);
        }
    } else if (angelAnimationActive) {
        const elapsed = Date.now() - angelAnimationTimer;
        if (elapsed < 1000) {
            dimBgAlpha = (elapsed / 1000) * 0.75;
            angelGoldShift = (elapsed / 1000) * 0.25;
            angelLightIntensity = elapsed / 1000;
        } else if (elapsed < 4500) {
            dimBgAlpha = 0.75;
            angelGoldShift = 0.25;
            angelLightIntensity = 1.0;
        } else if (elapsed < 5500) {
            dimBgAlpha = 0.75 * (1 - (elapsed - 4500) / 1000);
            angelGoldShift = 0.25 * (1 - (elapsed - 4500) / 1000);
            angelLightIntensity = 1.0 - (elapsed - 4500) / 1000;
        }
    } else if (earthAnimationActive) {
        const elapsed = Date.now() - earthAnimationTimer;
        if (elapsed < 5400) {
            dimBgAlpha = 0.95;
        } else if (elapsed < 6000) {
            dimBgAlpha = 0.95 * (1 - (elapsed - 5400) / 600);
        }
    }

    if (dimBgAlpha > 0) {
        ctx.save();
        if (malwareRedShift > 0) {
            ctx.fillStyle = `rgba(${Math.floor(malwareRedShift * 255)}, 0, ${Math.floor(malwareRedShift * 50)}, ${dimBgAlpha})`;
        } else if (demonFireShift > 0) {
            ctx.fillStyle = `rgba(${Math.floor(demonFireShift * 255)}, ${Math.floor(demonFireShift * 80)}, 0, ${dimBgAlpha})`;
        } else if (angelGoldShift > 0) {
            ctx.fillStyle = `rgba(${Math.floor(angelGoldShift * 255)}, ${Math.floor(angelGoldShift * 230)}, ${Math.floor(angelGoldShift * 180)}, ${dimBgAlpha * 0.45})`;
        } else {
            ctx.fillStyle = `rgba(0, 0, 0, ${dimBgAlpha * 0.94})`;
        }
        ctx.fillRect(0, 0, w, h);
        ctx.restore();
    }

    if (earthAnimationActive) {
        const elapsed = Date.now() - earthAnimationTimer;
        drawStarRevealAnimation(ctx, charX, charY - 30, elapsed, "#3b82f6");
    }

    // Draw Holy Light Beam if intensity > 0
    if (angelLightIntensity > 0) {
        ctx.save();
        const beamGrd = ctx.createLinearGradient(charX - 80, 0, charX + 80, 0);
        beamGrd.addColorStop(0, "rgba(254, 240, 138, 0)");
        beamGrd.addColorStop(0.35, `rgba(254, 240, 138, ${0.45 * angelLightIntensity})`);
        beamGrd.addColorStop(0.5, `rgba(255, 255, 255, ${0.75 * angelLightIntensity})`);
        beamGrd.addColorStop(0.65, `rgba(254, 240, 138, ${0.45 * angelLightIntensity})`);
        beamGrd.addColorStop(1, "rgba(254, 240, 138, 0)");

        ctx.fillStyle = beamGrd;
        ctx.fillRect(charX - 80, 0, 160, platformY + 10);

        // Spotlight on ground
        const spotGrd = ctx.createRadialGradient(charX, platformY, 0, charX, platformY, 70);
        spotGrd.addColorStop(0, `rgba(255, 255, 255, ${0.8 * angelLightIntensity})`);
        spotGrd.addColorStop(0.5, `rgba(254, 240, 138, ${0.45 * angelLightIntensity})`);
        spotGrd.addColorStop(1, "rgba(254, 240, 138, 0)");
        ctx.fillStyle = spotGrd;
        ctx.beginPath();
        ctx.ellipse(charX, platformY, 70, 18, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    if (state.equippedAura === "nature") {
        let showCloud = true;
        if (natureAnimationActive) {
            const elapsed = Date.now() - natureAnimationTimer;
            if (elapsed < 2500) showCloud = false;
        }
        if (showCloud) {
            drawNatureCloud(ctx, charX, charY + characterBob);
        }
    }

    // 4. Draw Character (Stickman)
    if (state.equippedAura === "relaxed") {
        let scale = 1;
        if (relaxedAnimationActive) {
            const elapsed = Date.now() - relaxedAnimationTimer;
            scale = Math.min(1, elapsed / 1500);
        }
        drawRelaxedClouds(ctx, charX, charY + characterBob, scale);
    }

    drawCharacter(ctx, charX, charY + characterBob);

    // Draw Closed/Bursting Flower Bud on Nature reveal
    if (natureAnimationActive) {
        const elapsed = Date.now() - natureAnimationTimer;
        drawNatureFlowerBud(ctx, charX, charY + characterBob, elapsed);

        // Intense acid-green flash and radial glow after burst
        if (elapsed >= 2500 && elapsed < 3200) {
            const flashAlpha = Math.max(0, 1 - (elapsed - 2500) / 700);
            ctx.save();
            ctx.fillStyle = `rgba(57, 255, 20, ${flashAlpha * 0.35})`;
            ctx.fillRect(0, 0, w, h);

            const grad = ctx.createRadialGradient(charX, charY - 30, 0, charX, charY - 30, 160);
            grad.addColorStop(0, `rgba(57, 255, 20, ${flashAlpha * 0.8})`);
            grad.addColorStop(1, `rgba(57, 255, 20, 0)`);
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(charX, charY - 30, 160, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    // Draw Glitch Aura reveal explosion and digital pixel ring
    if (glitchAnimationActive) {
        const elapsed = Date.now() - glitchAnimationTimer;
        if (elapsed >= 4200 && elapsed < 4800) {
            const p = (elapsed - 4200) / 600; // 0 to 1
            ctx.save();
            const radius = p * 220;
            const segments = 16;
            for (let i = 0; i < segments; i++) {
                const angle = (i / segments) * Math.PI * 2 + (p * Math.PI * 0.2);
                const px = charX + Math.cos(angle) * radius;
                const py = charY - 30 + Math.sin(angle) * radius;
                ctx.fillStyle = i % 3 === 0 ? "#00ffcc" : (i % 3 === 1 ? "#ff0055" : "#ffffff");
                ctx.fillRect(px - 8, py - 8, 16, 16);
            }
            ctx.restore();

            // Bright white full screen flash
            const flashAlpha = Math.max(0, 1 - (elapsed - 4200) / 500);
            ctx.save();
            ctx.fillStyle = `rgba(255, 255, 255, ${flashAlpha * 0.55})`;
            ctx.fillRect(0, 0, w, h);
            ctx.restore();
        }
    }

    // Draw Malware Aura reveal cutscene warning popups and scans
    if (malwareAnimationActive) {
        const elapsed = Date.now() - malwareAnimationTimer;
        drawMalwareCutsceneEffects(ctx, charX, charY + characterBob, elapsed);
    }

    // 5. Update and draw foreground/above particles
    particles.forEach(p => {
        if (p.shape !== "ripple") {
            p.update();
            p.draw(ctx);
        }
    });

    // 6. Draw Aura Floating Wind Cloud (Aura Tier: wind)
    if (state.equippedAura === "wind") {
        drawWindCloud(ctx, charX, charY - 100 + characterBob * 0.5, timestamp);
    }

    // 7. Draw Legendary Chest Star (Aura Tier: legendary)
    if (state.equippedAura === "legendary") {
        let showStar = true;
        if (legendaryAnimationActive) {
            const elapsed = Date.now() - legendaryAnimationTimer;
            if (elapsed < 1000) showStar = false;
        }
        if (showStar) {
            drawLegendaryChestStar(ctx, charX, charY - 55 + characterBob, timestamp);
        }
    }

    // 8. Draw Emerald Shoulder Gems (Aura Tier: emerald)
    if (state.equippedAura === "emerald") {
        let showGems = true;
        if (emeraldAnimationActive) {
            const elapsed = Date.now() - emeraldAnimationTimer;
            if (elapsed < 2200) showGems = false;
        }
        if (showGems) {
            drawEmeraldAuraGems(ctx, charX, charY + characterBob, timestamp);
        }
    }

    // 9. Draw Moon (Aura Tier: relaxed)
    if (state.equippedAura === "relaxed") {
        let scale = 1;
        let showMoon = true;
        if (relaxedAnimationActive) {
            const elapsed = Date.now() - relaxedAnimationTimer;
            if (elapsed < 2800) {
                showMoon = false;
            } else {
                scale = Math.min(1, (elapsed - 2800) / 700);
            }
        }
        if (showMoon) {
            drawCrescentMoon(ctx, charX - 10, charY - 75 + characterBob, 20 * scale, timestamp);
        }
    }

    // Draw Descending Emerald during roll animation
    if (emeraldAnimationActive) {
        const elapsed = Date.now() - emeraldAnimationTimer;
        if (elapsed >= 1000 && elapsed < 2200) {
            const progress = (elapsed - 1000) / 1200;
            const gemX = charX + 16;
            const startY = charY - 250;
            const endY = charY - 72 + characterBob; // raised hand level
            const gemY = startY + (endY - startY) * progress;

            ctx.save();
            ctx.shadowColor = "#10b981";
            ctx.shadowBlur = 25;
            drawEmeraldShape(ctx, gemX, gemY, 9);
            ctx.restore();
        }
    }

    ctx.restore();
}

// Draw Background Space Particles
let backgroundStars = [];
function initBackgroundStars() {
    backgroundStars = [];
    for (let i = 0; i < 40; i++) {
        backgroundStars.push({
            x: Math.random(),
            y: Math.random(),
            size: Math.random() * 1.5 + 0.5,
            speed: Math.random() * 0.0003 + 0.0001,
            phase: Math.random() * Math.PI * 2
        });
    }
}
initBackgroundStars();

function drawBackgroundStars(w, h, ts) {
    ctx.save();
    backgroundStars.forEach(s => {
        const starX = s.x * w;
        // Slowly drift stars down
        s.y += s.speed;
        if (s.y > 1) s.y = 0;
        const starY = s.y * h;

        const alpha = 0.15 + 0.15 * Math.sin(ts * 0.001 + s.phase);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(starX, starY, s.size, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.restore();
}

// Draw Platform Cylindrical 2.5D Hexagon
function drawPlatform(c, x, y) {
    const rx = 100;
    const ry = 42;

    const skinId = state.cosmetics.equippedPlatform;
    const skin = PLATFORMS.find(p => p.id === skinId) || PLATFORMS[0];
    
    const depth = skin.effect === "void-swirl" ? 60 : 22;

    c.save();

    // 1. Shadows under platform
    if (skin.effect === "void-swirl") {
        const gradShadow = c.createRadialGradient(x, y + depth * 0.6, 20, x, y + depth * 0.6, rx * 1.5);
        gradShadow.addColorStop(0, "rgba(139, 92, 246, 0.4)");
        gradShadow.addColorStop(0.5, "rgba(76, 29, 149, 0.15)");
        gradShadow.addColorStop(1, "rgba(0, 0, 0, 0)");
        c.fillStyle = gradShadow;
        c.beginPath();
        c.ellipse(x, y + depth * 0.6, rx * 1.5, ry * 1.5, 0, 0, Math.PI * 2);
        c.fill();
    } else {
        const gradShadow = c.createRadialGradient(x, y + depth / 2, 20, x, y + depth / 2, rx * 1.2);
        gradShadow.addColorStop(0, "rgba(0, 0, 0, 0.6)");
        gradShadow.addColorStop(1, "rgba(0, 0, 0, 0)");
        c.fillStyle = gradShadow;
        c.beginPath();
        c.ellipse(x, y + depth / 2, rx * 1.2, ry * 1.2, 0, 0, Math.PI * 2);
        c.fill();
    }

    // 2. Main Platform 3D Cylindrical Extrusion
    const segments = 8; // Octagon platform for cool look
    const pointsTop = [];
    const pointsBot = [];

    for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        const px = x + Math.cos(angle) * rx;
        const py = y + Math.sin(angle) * ry;
        pointsTop.push({ x: px, y: py });
        pointsBot.push({ x: px, y: py + depth });
    }

    // Side Panels
    for (let i = 0; i < segments; i++) {
        const p1 = pointsTop[i];
        const p2 = pointsTop[i + 1];
        const p3 = pointsBot[i + 1];
        const p4 = pointsBot[i];

        // Only draw front facing segments (y coordinates growing)
        if (p1.y >= y || p2.y >= y) {
            c.beginPath();
            c.moveTo(p1.x, p1.y);
            c.lineTo(p2.x, p2.y);
            c.lineTo(p3.x, p3.y);
            c.lineTo(p4.x, p4.y);
            c.closePath();

            // Side shade
            const dx = p2.x - p1.x;
            const shadeFactor = 0.5 + 0.4 * (dx / (rx * 2)); // shade based on panel angle
            
            if (skin.effect === "void-swirl") {
                const sideGrad = c.createLinearGradient(0, y, 0, y + depth);
                sideGrad.addColorStop(0, colorLuminance(skin.color, -0.3 * shadeFactor));
                sideGrad.addColorStop(0.5, colorLuminance(skin.secondaryColor, -0.5 * shadeFactor));
                sideGrad.addColorStop(1, "rgba(5, 0, 15, 0)");
                c.fillStyle = sideGrad;
                c.fill();
            } else {
                c.fillStyle = colorLuminance(skin.secondaryColor, -0.2 * shadeFactor);
                c.fill();

                c.strokeStyle = "rgba(0,0,0,0.2)";
                c.lineWidth = 1;
                c.stroke();
            }
        }
    }

    // Top surface
    c.beginPath();
    c.moveTo(pointsTop[0].x, pointsTop[0].y);
    for (let i = 1; i < segments; i++) {
        c.lineTo(pointsTop[i].x, pointsTop[i].y);
    }
    c.closePath();

    // Fill surface
    if (skin.effect === "lava-cracks") {
        c.fillStyle = "#1e1515";
    } else if (skin.effect === "void-swirl") {
        c.fillStyle = "#000000";
    } else {
        c.fillStyle = skin.color;
    }
    c.fill();

    // Custom Platform Effects
    if (skin.effect === "lava-cracks") {
        // Lava cracks glowing
        c.strokeStyle = "#ff4500";
        c.lineWidth = 3;
        c.shadowColor = "#ff2200";
        c.shadowBlur = 8;

        c.beginPath();
        c.moveTo(x - 60, y - 10);
        c.lineTo(x + 20, y + 10);
        c.lineTo(x - 10, y + 20);
        c.moveTo(x - 20, y - 20);
        c.lineTo(x + 40, y - 5);
        c.stroke();

        c.shadowBlur = 0;
    } else if (skin.effect === "neon-lines") {
        // Glowing cyan cyberpunk grid rings
        c.strokeStyle = "#00f5d4";
        c.lineWidth = 2;
        c.shadowColor = "#00f5d4";
        c.shadowBlur = 6;

        c.beginPath();
        c.ellipse(x, y, rx * 0.8, ry * 0.8, 0, 0, Math.PI * 2);
        c.stroke();

        c.shadowBlur = 0;
    } else if (skin.effect === "void-swirl") {
        const time = Date.now() * 0.001;
        
        c.save();
        
        // Clip to the top octagon
        c.beginPath();
        c.moveTo(pointsTop[0].x, pointsTop[0].y);
        for (let i = 1; i < segments; i++) {
            c.lineTo(pointsTop[i].x, pointsTop[i].y);
        }
        c.closePath();
        c.clip();

        // Dark gradient base
        const grad = c.createRadialGradient(x, y, 0, x, y, rx);
        grad.addColorStop(0, "#000000"); // Pure black abyss core
        grad.addColorStop(0.2, "#050014"); 
        grad.addColorStop(0.5, "#1f093d");
        grad.addColorStop(0.8, "#3b0764");
        grad.addColorStop(1, "#6d28d9");
        c.fillStyle = grad;
        c.fill();

        // Enter flat circular space for easy spiral math
        c.translate(x, y);
        c.scale(1, ry / rx);

        // Draw animated spiral arms
        c.lineWidth = 3.5;
        c.lineCap = "round";

        const numArms = 6;
        for (let a = 0; a < numArms; a++) {
            c.beginPath();
            const angleOffset = (Math.PI * 2 / numArms) * a;
            for (let r = rx; r > 2; r -= 3) {
                // Wind inwards: spiral angle increases as radius decreases
                const angle = angleOffset - time * 1.8 + (rx - r) * 0.055;
                const px = Math.cos(angle) * r;
                const py = Math.sin(angle) * r;
                
                if (r === rx) {
                    c.moveTo(px, py);
                } else {
                    c.lineTo(px, py);
                }
            }
            
            // Fade spiral arms towards the center
            const armGrad = c.createRadialGradient(0, 0, 0, 0, 0, rx);
            armGrad.addColorStop(0, "rgba(139, 92, 246, 0)"); // hidden at center
            armGrad.addColorStop(0.3, "rgba(167, 139, 250, 0.2)"); 
            armGrad.addColorStop(0.6, "rgba(196, 181, 253, 0.6)");
            armGrad.addColorStop(1, "rgba(237, 233, 254, 0.1)");
            c.strokeStyle = armGrad;
            c.stroke();
        }

        // Floating/sucked-in void dust
        for (let i = 0; i < 50; i++) {
            const pTime = (time * 0.35 + i * 0.618) % 1; // 0 to 1 (1 is center)
            const pRadius = rx * (1 - Math.pow(pTime, 1.8)); // smooth acceleration towards center
            const pAngle = i * 2.4 - time * 2.8 + (rx - pRadius) * 0.07; 
            const px = Math.cos(pAngle) * pRadius;
            const py = Math.sin(pAngle) * pRadius;
            
            const alpha = (1 - pTime) * (0.6 + Math.sin(time * 6 + i) * 0.4);
            c.fillStyle = `rgba(237, 233, 254, ${alpha})`;
            c.beginPath();
            c.arc(px, py, 1.8 * (1 - pTime) + 0.6, 0, Math.PI * 2);
            c.fill();
        }

        // Inner absolute black hole
        c.beginPath();
        c.arc(0, 0, 15, 0, Math.PI * 2);
        c.fillStyle = "#000000";
        c.shadowColor = "#000000";
        c.shadowBlur = 20;
        c.fill();
        c.shadowBlur = 0;

        // Glowing deep ring around the hole
        c.beginPath();
        c.arc(0, 0, 17, 0, Math.PI * 2);
        c.strokeStyle = "rgba(167, 139, 250, 0.4)";
        c.lineWidth = 2;
        c.stroke();

        c.restore();
    }

    // Platform Rim Highlight
    if (skin.effect === "void-swirl") {
        c.strokeStyle = "rgba(167, 139, 250, 0.6)";
        c.lineWidth = 2.5;
        c.shadowColor = "#8b5cf6";
        c.shadowBlur = 10;
    } else {
        c.strokeStyle = "rgba(255, 255, 255, 0.25)";
        c.lineWidth = 2;
        c.shadowBlur = 0;
    }
    
    c.beginPath();
    c.moveTo(pointsTop[0].x, pointsTop[0].y);
    for (let i = 1; i <= segments; i++) {
        c.lineTo(pointsTop[i].x, pointsTop[i].y);
    }
    c.stroke();
    c.shadowBlur = 0;

    c.restore();
}

// Utility to brighten/darken hex colors
function colorLuminance(hex, lum) {
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;
    let rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
    }
    return rgb;
}

// Draw random highly-glitched poses during Glitch Aura reveal animation
function drawGlitchyPose(c, x, y, skin) {
    c.save();

    // Random position jittering
    const dx = (Math.random() - 0.5) * 16;
    const dy = (Math.random() - 0.5) * 16;
    c.translate(x + dx, y + dy);

    // Randomize line widths and digital colors
    const colors = ["#00ffcc", "#ff0055", "#0055ff", "#ffffff", "#ffcc00"];
    c.strokeStyle = colors[Math.floor(Math.random() * colors.length)];
    c.lineWidth = Math.random() * 5 + 2;
    c.lineCap = "square";

    // Draw disconnected bone vectors
    c.beginPath();
    for (let i = 0; i < 6; i++) {
        const startX = (Math.random() - 0.5) * 60;
        const startY = -Math.random() * 85;
        const endX = startX + (Math.random() - 0.5) * 40;
        const endY = startY + (Math.random() - 0.5) * 40;
        c.moveTo(startX, startY);
        c.lineTo(endX, endY);
    }
    c.stroke();

    // Random glitch heads (circles, squares, or crossbars)
    c.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    c.beginPath();
    const hx = (Math.random() - 0.5) * 25;
    const hy = -70 + (Math.random() - 0.5) * 20;
    if (Math.random() < 0.5) {
        c.rect(hx - 8, hy - 8, 16, 16);
    } else {
        c.arc(hx, hy, 8, 0, Math.PI * 2);
    }
    c.fill();

    c.restore();
}

// Multicolored glitch rectangles for body and background
function drawGlitchRectangles(c, x, y) {
    c.save();
    const colors = ["#00ffcc", "#ff0055", "#0055ff", "#ffffff", "#ffcc00"];
    const numRects = Math.floor(Math.random() * 6) + 5;
    for (let i = 0; i < numRects; i++) {
        c.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        const rx = x + (Math.random() * 28 - 14);
        const ry = y - 80 + (Math.random() * 75);
        const rw = Math.random() * 14 + 5;
        const rh = Math.random() * 7 + 2;
        c.fillRect(rx, ry, rw, rh);
    }
    c.restore();
}

// Spreads arms wide during explosion
function drawSpreadingArmsStickman(c, x, y, progress, skin) {
    const torsoY = y - 14;
    const neckY = y - 56;
    const headY = y - 68;
    const headRadius = 10;

    c.strokeStyle = skin.color;
    c.fillStyle = skin.color;
    c.lineWidth = 5.5;

    // Legs dangling
    c.beginPath();
    c.moveTo(x, torsoY);
    c.lineTo(x - 8, y - 8);
    c.lineTo(x - 10, y);
    c.moveTo(x, torsoY);
    c.lineTo(x + 6, y - 10);
    c.lineTo(x + 7, y - 2);
    c.stroke();

    // Torso
    c.beginPath();
    c.moveTo(x, torsoY);
    c.lineTo(x, neckY);
    c.stroke();

    // Arms spreading wide
    c.beginPath();
    const leftHandX = x - 18 - 24 * progress;
    const leftHandY = neckY + 20 - 45 * progress;
    c.moveTo(x, neckY + 8);
    c.lineTo(x - 12, neckY + 16);
    c.lineTo(leftHandX, leftHandY);

    const rightHandX = x + 18 + 24 * progress;
    const rightHandY = neckY + 20 - 45 * progress;
    c.moveTo(x, neckY + 8);
    c.lineTo(x + 12, neckY + 16);
    c.lineTo(rightHandX, rightHandY);
    c.stroke();

    // Head
    drawStickmanHead(c, x, headY, headRadius);
}

// Draw stickman head or custom image head
function drawStickmanHead(c, x, headY, headRadius) {
    let img = null;
    if (state.cosmetics.equippedCharacter === "mellstroy") {
        img = mellstroyImage;
    }

    if (img && img.complete && img.naturalWidth !== 0) {
        c.save();
        const size = headRadius * 2.8;
        c.drawImage(img, x - size / 2, headY - size / 2, size, size);
        c.restore();
    } else {
        c.beginPath();
        c.arc(x, headY, headRadius, 0, Math.PI * 2);
        c.fill();
        c.strokeStyle = "rgba(0,0,0,0.15)";
        c.lineWidth = 1.5;
        c.stroke();
    }
}

// Draw normal standing stickman
function drawNormalStickmanAt(c, x, y, skin) {
    const torsoY = y - 14;
    const neckY = y - 56;
    const headY = y - 68;
    const headRadius = 10;

    c.strokeStyle = skin.color;
    c.fillStyle = skin.color;
    c.lineWidth = 5.5;

    // Legs
    c.beginPath();
    c.moveTo(x, torsoY);
    c.lineTo(x - 12, y - 5);
    c.lineTo(x - 16, y);
    c.moveTo(x, torsoY);
    c.lineTo(x + 12, y - 5);
    c.lineTo(x + 16, y);
    c.stroke();

    // Torso
    c.beginPath();
    c.moveTo(x, torsoY);
    c.lineTo(x, neckY);
    c.stroke();

    // Arms
    c.beginPath();
    const armSwing = Math.sin(Date.now() * 0.002) * 4;
    c.moveTo(x, neckY + 8);
    c.lineTo(x - 18, neckY + 20 + armSwing);
    c.lineTo(x - 14, neckY + 38 + armSwing * 0.5);
    c.moveTo(x, neckY + 8);
    c.lineTo(x + 18, neckY + 20 - armSwing);
    c.lineTo(x + 14, neckY + 38 - armSwing * 0.5);
    c.stroke();

    // Head
    drawStickmanHead(c, x, headY, headRadius);
}

// Draw Demon stickman with horns and trident
function drawDemonStickmanAt(c, x, y, skin, hasGear) {
    const torsoY = y - 14;
    const neckY = y - 56;
    const headY = y - 68;
    const headRadius = 10;

    c.strokeStyle = skin.color;
    c.fillStyle = skin.color;
    c.lineWidth = 5.5;

    // Legs
    c.beginPath();
    c.moveTo(x, torsoY);
    c.lineTo(x - 12, y - 5);
    c.lineTo(x - 16, y);
    c.moveTo(x, torsoY);
    c.lineTo(x + 12, y - 5);
    c.lineTo(x + 16, y);
    c.stroke();

    // Torso
    c.beginPath();
    c.moveTo(x, torsoY);
    c.lineTo(x, neckY);
    c.stroke();

    // Arms
    c.beginPath();
    // Left Arm (hanging relaxedly)
    const armSwing = Math.sin(Date.now() * 0.002) * 4;
    c.moveTo(x, neckY + 8);
    c.lineTo(x - 18, neckY + 20 + armSwing);
    c.lineTo(x - 14, neckY + 38 + armSwing * 0.5);

    // Right Arm (holds the trident if hasGear is true)
    if (hasGear) {
        c.moveTo(x, neckY + 8);
        c.lineTo(x + 16, neckY + 16);
        c.lineTo(x + 24, neckY + 28);
    } else {
        c.moveTo(x, neckY + 8);
        c.lineTo(x + 18, neckY + 20 - armSwing);
        c.lineTo(x + 14, neckY + 38 - armSwing * 0.5);
    }
    c.stroke();

    // Head
    drawStickmanHead(c, x, headY, headRadius);

    if (hasGear) {
        // Draw Horns on Head
        c.save();
        c.fillStyle = "#ff3300";
        c.strokeStyle = "#990000";
        c.lineWidth = 2.0;

        // Left Horn
        c.beginPath();
        c.moveTo(x - 4, headY - 6);
        c.quadraticCurveTo(x - 16, headY - 18, x - 14, headY - 25);
        c.quadraticCurveTo(x - 10, headY - 16, x - 1, headY - 8);
        c.closePath();
        c.fill();
        c.stroke();

        // Right Horn
        c.beginPath();
        c.moveTo(x + 4, headY - 6);
        c.quadraticCurveTo(x + 16, headY - 18, x + 14, headY - 25);
        c.quadraticCurveTo(x + 10, headY - 16, x + 1, headY - 8);
        c.closePath();
        c.fill();
        c.stroke();

        c.restore();

        // Draw Trident in Hand
        c.save();
        c.strokeStyle = "#ffaa00"; // golden/fiery trident
        c.fillStyle = "#ffaa00";
        c.shadowColor = "#ff3300";
        c.shadowBlur = 8;
        c.lineWidth = 3;

        const handX = x + 24;
        const handY = neckY + 28;

        const bottomX = handX - 8;
        const bottomY = handY + 22;
        const topX = handX + 10;
        const topY = handY - 30;

        c.beginPath();
        c.moveTo(bottomX, bottomY);
        c.lineTo(topX, topY);
        c.stroke();

        const dx = topX - bottomX;
        const dy = topY - bottomY;
        const angle = Math.atan2(dy, dx);

        c.translate(topX, topY);
        c.rotate(angle);

        c.beginPath();
        c.moveTo(0, -8);
        c.lineTo(0, 8);
        c.stroke();

        c.beginPath();
        c.moveTo(0, 0);
        c.lineTo(16, 0);
        c.stroke();

        c.beginPath();
        c.moveTo(0, -8);
        c.quadraticCurveTo(8, -8, 12, -4);
        c.stroke();

        c.beginPath();
        c.moveTo(0, 8);
        c.quadraticCurveTo(8, 8, 12, 4);
        c.stroke();

        c.restore();
    }
}

// Draw Angel stickman with wings, halo, and praying hands
function drawAngelStickmanAt(c, x, y, skin, isFlapping) {
    const torsoY = y - 14;
    const neckY = y - 56;
    const headY = y - 68;
    const headRadius = 10;

    // 1. Wings (behind torso)
    const flapAngle = isFlapping ? Math.sin(Date.now() * 0.012) * 0.28 : Math.sin(Date.now() * 0.002) * 0.06;

    // Left Wing
    c.save();
    c.translate(x, torsoY - 15);
    c.rotate(-Math.PI / 4 + flapAngle);
    c.fillStyle = "rgba(255, 255, 255, 0.92)";
    c.strokeStyle = "#fef08a";
    c.shadowColor = "#fef08a";
    c.shadowBlur = 6;
    c.lineWidth = 1.5;
    c.beginPath();
    c.moveTo(0, 0);
    c.bezierCurveTo(-25, -30, -45, -10, -55, -5);
    c.bezierCurveTo(-40, 8, -18, 4, 0, 0);
    c.closePath();
    c.fill();
    c.stroke();
    c.restore();

    // Right Wing
    c.save();
    c.translate(x, torsoY - 15);
    c.rotate(Math.PI / 4 - flapAngle);
    c.fillStyle = "rgba(255, 255, 255, 0.92)";
    c.strokeStyle = "#fef08a";
    c.shadowColor = "#fef08a";
    c.shadowBlur = 6;
    c.lineWidth = 1.5;
    c.beginPath();
    c.moveTo(0, 0);
    c.bezierCurveTo(25, -30, 45, -10, 55, -5);
    c.bezierCurveTo(40, 8, 18, 4, 0, 0);
    c.closePath();
    c.fill();
    c.stroke();
    c.restore();

    // Stickman skeleton styling
    c.strokeStyle = skin.color;
    c.fillStyle = skin.color;
    c.lineWidth = 5.5;

    // Legs (dangling downward relaxedly)
    c.beginPath();
    c.moveTo(x, torsoY);
    c.lineTo(x - 6, y - 4);
    c.lineTo(x - 4, y + 8);
    c.moveTo(x, torsoY);
    c.lineTo(x + 6, y - 4);
    c.lineTo(x + 4, y + 8);
    c.stroke();

    // Torso
    c.beginPath();
    c.moveTo(x, torsoY);
    c.lineTo(x, neckY);
    c.stroke();

    // Praying/Joined Hands
    c.beginPath();
    c.moveTo(x, neckY + 8);
    c.lineTo(x - 8, neckY + 20);
    c.lineTo(x, neckY + 28);
    c.moveTo(x, neckY + 8);
    c.lineTo(x + 8, neckY + 20);
    c.lineTo(x, neckY + 28);
    c.stroke();

    // Head
    drawStickmanHead(c, x, headY, headRadius);

    // Halo (above head)
    c.save();
    c.strokeStyle = "#fef08a";
    c.shadowColor = "#fef08a";
    c.shadowBlur = 10;
    c.lineWidth = 3;
    c.beginPath();
    c.ellipse(x, headY - 14, 12, 4, 0, 0, Math.PI * 2);
    c.stroke();

    // Prayer Glow center point
    c.fillStyle = "#fff";
    c.shadowBlur = 6;
    c.beginPath();
    c.arc(x, neckY + 28, 3.5, 0, Math.PI * 2);
    c.fill();

    c.restore();
}

// Draw Character Stickman
function drawCharacter(c, x, y) {
    const skinId = state.cosmetics.equippedCharacter;
    const skin = CHARACTERS.find(ch => ch.id === skinId) || CHARACTERS[0];

    c.save();
    c.strokeStyle = skin.color;
    c.fillStyle = skin.color;
    c.lineWidth = 5.5;
    c.lineCap = "round";
    c.lineJoin = "round";

    // Glow for cyber skin
    if (skin.style === "knight") {
        c.shadowColor = "rgba(148, 163, 184, 0.4)";
        c.shadowBlur = 6;
    } else if (skin.style === "shadow") {
        c.shadowColor = "#4338ca";
        c.shadowBlur = 10;
        c.strokeStyle = "#0d0b26";
        c.fillStyle = "#0d0b26";
    }

    // Levitating offset for Glitch, Malware & Angel Aura (only when not in active phase checks)
    let levitateY = 0;
    if (state.equippedAura === "glitch" || state.equippedAura === "malware" || state.equippedAura === "angel") {
        let shouldLevitate = true;
        if (state.equippedAura === "glitch" && glitchAnimationActive) {
            const elapsed = Date.now() - glitchAnimationTimer;
            if (elapsed < 4200) shouldLevitate = false;
        } else if (state.equippedAura === "malware" && malwareAnimationActive) {
            const elapsed = Date.now() - malwareAnimationTimer;
            if (elapsed < 3500) shouldLevitate = false;
        } else if (state.equippedAura === "angel" && angelAnimationActive) {
            shouldLevitate = false;
        }
        if (shouldLevitate) {
            if (state.equippedAura === "angel") {
                levitateY = Math.sin(Date.now() * 0.003) * 6 - 28;
            } else {
                levitateY = Math.sin(Date.now() * 0.0025) * 12 - 16;
            }
            y += levitateY;
        }
    }

    // Handle Glitch Aura reveal animation phases
    if (state.equippedAura === "glitch" && glitchAnimationActive) {
        const elapsed = Date.now() - glitchAnimationTimer;

        if (elapsed < 1500) {
            // Phase 1: Shrinking down
            const progress = elapsed / 1500;
            const scale = 1.0 - 0.7 * progress + (Math.random() - 0.5) * 0.05;

            c.save();
            c.translate(x, y);
            c.scale(scale, scale);
            drawNormalStickmanAt(c, 0, 0, skin);
            c.restore();
            c.restore();
            return;
        } else if (elapsed >= 1500 && elapsed < 4200) {
            // Phase 2 & 3: Glitching pose, rapidly changing poses and shaking
            c.save();
            let scale = 0.3;
            if (elapsed >= 3500) {
                const p = (elapsed - 3500) / 700;
                scale = 0.3 + 0.9 * p; // scale back up towards 1.2
            }
            c.translate(x, y);
            c.scale(scale, scale);
            drawGlitchyPose(c, 0, 0, skin);
            c.restore();
            c.restore();
            return;
        } else if (elapsed >= 4200 && elapsed < 5000) {
            // Phase 4: Explosion burst! Spreads arms wide!
            const p = Math.min(1, (elapsed - 4200) / 400); // 400ms spread
            c.save();
            c.translate(x, y);
            drawSpreadingArmsStickman(c, 0, 0, p, skin);
            drawGlitchRectangles(c, 0, 0);
            c.restore();
            c.restore();
            return;
        }
    }

    // Handle Malware Aura reveal animation phases
    if (state.equippedAura === "malware" && malwareAnimationActive) {
        const elapsed = Date.now() - malwareAnimationTimer;

        if (elapsed < 1200) {
            // Phase 1: Frozen and twitching slightly
            const dx = (Math.random() - 0.5) * 3;
            c.save();
            c.translate(x + dx, y);
            drawNormalStickmanAt(c, 0, 0, skin);
            c.restore();
            c.restore();
            return;
        } else if (elapsed >= 1200 && elapsed < 3500) {
            // Phase 2 & 3: Violent error corruption twitching, colors changing red
            c.save();
            const dx = (Math.random() - 0.5) * 10;
            const dy = (Math.random() - 0.5) * 6;
            c.translate(x + dx, y + dy);

            c.strokeStyle = Math.random() < 0.4 ? "#ff0055" : skin.color;
            c.shadowColor = "#ff0055";
            c.shadowBlur = 8;

            drawNormalStickmanAt(c, 0, 0, { color: c.strokeStyle });
            c.restore();
            c.restore();
            return;
        } else if (elapsed >= 3500 && elapsed < 4500) {
            // Phase 4: Explosion burst! Levitating with arms wide!
            const p = Math.min(1, (elapsed - 3500) / 400); // 400ms spread
            c.save();
            c.translate(x, y);
            c.strokeStyle = "#ff0055";
            c.fillStyle = "#ff0055";
            c.shadowColor = "#ff0055";
            c.shadowBlur = 12;
            drawSpreadingArmsStickman(c, 0, 0, p, { color: "#ff0055" });
            c.restore();
            c.restore();
            return;
        }
    }

    // Handle Demon Aura reveal animation phases
    if (state.equippedAura === "demon" && demonAnimationActive) {
        const elapsed = Date.now() - demonAnimationTimer;

        if (elapsed < 1500) {
            // Phase 1: Sinking downwards into the portal (clipped to stay above portal line)
            const sinkY = (elapsed / 1500) * 80;
            c.save();

            c.beginPath();
            c.rect(x - 200, y - 999, 400, 999);
            c.clip();

            c.translate(x, y + sinkY);
            drawNormalStickmanAt(c, 0, 0, skin);
            c.restore();
            c.restore();
            return;
        } else if (elapsed >= 1500 && elapsed < 2500) {
            // Phase 2: Underworld (invisible)
            c.restore();
            return;
        } else if (elapsed >= 2500 && elapsed < 3500) {
            // Phase 3: Leap out with spin (clipped to look like emerging out of the portal)
            const sinkY = Math.max(0, 80 - ((elapsed - 2500) / 300) * 80);
            const spinProgress = Math.min(1, (elapsed - 2500) / 600);
            const spinAngle = (1 - spinProgress) * Math.PI * 2;

            c.save();

            c.beginPath();
            c.rect(x - 200, y - 999, 400, 999);
            c.clip();

            c.translate(x, y + sinkY - 30);
            c.rotate(spinAngle);

            // Draw demon stickman
            drawDemonStickmanAt(c, 0, 30, skin, true);
            c.restore();
            c.restore();
            return;
        }
    }

    // Normal demon drawing:
    if (state.equippedAura === "demon") {
        drawDemonStickmanAt(c, x, y, skin, true);
        c.restore();
        return;
    }

    // Handle Angel Aura reveal animation phases
    if (state.equippedAura === "angel" && angelAnimationActive) {
        const elapsed = Date.now() - angelAnimationTimer;

        if (elapsed < 1000) {
            // Phase 1: Light appears, player is on the ground
            drawNormalStickmanAt(c, x, y, skin);
            c.restore();
            return;
        } else if (elapsed >= 1000 && elapsed < 2500) {
            // Phase 2: Flying up to heaven
            const progress = (elapsed - 1000) / 1500;
            const flyY = -progress * 350;
            drawNormalStickmanAt(c, x, y + flyY, skin);
            c.restore();
            return;
        } else if (elapsed >= 2500 && elapsed < 3000) {
            // Phase 3: In heaven (invisible)
            c.restore();
            return;
        } else if (elapsed >= 3000 && elapsed < 4500) {
            // Phase 4: Slowly descending, flapping wings
            const progress = (elapsed - 3000) / 1500;
            const flyY = -350 + progress * 322;
            drawAngelStickmanAt(c, x, y + flyY, skin, true);
            c.restore();
            return;
        } else if (elapsed >= 4500 && elapsed < 5500) {
            // Phase 5: Levitating on hover level
            const hoverOsc = Math.sin(Date.now() * 0.003) * 6;
            drawAngelStickmanAt(c, x, y - 28 + hoverOsc, skin, true);
            c.restore();
            return;
        }
    }

    // Normal angel drawing:
    if (state.equippedAura === "angel") {
        const hoverOsc = Math.sin(Date.now() * 0.003) * 6;
        drawAngelStickmanAt(c, x, y - 28 + hoverOsc, skin, true);
        c.restore();
        return;
    }

    // Handle Nature Aura hidden pose during sprout phase
    if (state.equippedAura === "nature" && natureAnimationActive) {
        const elapsed = Date.now() - natureAnimationTimer;
        if (elapsed < 2500) {
            c.restore();
            return; // Completely hidden inside the closed flower bud
        }
    }

    // Handle Relaxed Aura poses
    if (state.equippedAura === "relaxed") {
        if (relaxedAnimationActive) {
            const elapsed = Date.now() - relaxedAnimationTimer;
            if (elapsed < 1500) {
                // Standing yawning pose
                drawYawningPose(c, x, y, skin);
                c.restore();
                return;
            } else if (elapsed >= 1500 && elapsed < 2800) {
                // Interpolate floating and tilting
                const progress = (elapsed - 1500) / 1300;
                c.save();
                c.translate(x, y - progress * 12);
                c.rotate(-progress * Math.PI / 2);
                // Draw yawning pose centered around translated base
                drawYawningPose(c, 0, 0, skin);
                c.restore();
                c.restore();
                return;
            } else {
                drawSleepingPose(c, x, y, Date.now(), skin);
                c.restore();
                return;
            }
        } else {
            drawSleepingPose(c, x, y, Date.now(), skin);
            c.restore();
            return;
        }
    }

    // Handle Earth Aura overrides
    if (state.equippedAura === "earth") {
        if (earthAnimationActive) {
            const elapsed = Date.now() - earthAnimationTimer;
            if (elapsed < 1500) {
                c.restore();
                return;
            }
            drawEarthCharacter(c, x, y, elapsed, skin);
            c.restore();
            return;
        } else {
            drawEarthCharacter(c, x, y, 99999, skin);
            c.restore();
            return;
        }
    }

    // Human Joint Coordinates relative to X, Y (feet base)
    const torsoY = y - 14;
    const neckY = y - 56;
    const headY = y - 68;
    const headRadius = 10;

    // Legs
    if (state.equippedAura === "nature") {
        c.save();
        c.strokeStyle = "#78350f"; // wooden brown
        c.lineWidth = 7.5; // thicker wood/trunk
        c.lineCap = "round";
        c.lineJoin = "round";

        c.beginPath();
        // Left root leg
        c.moveTo(x, torsoY);
        c.quadraticCurveTo(x - 10, y - 8, x - 16, y);
        // Add a small extra root flare/sprout
        c.moveTo(x - 6, y - 8);
        c.lineTo(x - 10, y);

        // Right root leg
        c.moveTo(x, torsoY);
        c.quadraticCurveTo(x + 10, y - 8, x + 16, y);
        // Add a small extra root flare/sprout
        c.moveTo(x + 6, y - 8);
        c.lineTo(x + 12, y);

        c.stroke();
        c.restore();
    } else if (state.equippedAura === "glitch") {
        c.beginPath();
        // Dangling left leg
        c.moveTo(x, torsoY);
        c.lineTo(x - 8, y - 8);
        c.lineTo(x - 10, y);
        // Dangling right leg
        c.moveTo(x, torsoY);
        c.lineTo(x + 6, y - 10);
        c.lineTo(x + 7, y - 2);
        c.stroke();
    } else {
        c.beginPath();
        // Left leg
        c.moveTo(x, torsoY);
        c.lineTo(x - 12, y - 5);
        c.lineTo(x - 16, y);
        // Right leg
        c.moveTo(x, torsoY);
        c.lineTo(x + 12, y - 5);
        c.lineTo(x + 16, y);
        c.stroke();
    }

    // Torso / Spine
    c.beginPath();
    c.moveTo(x, torsoY);
    c.lineTo(x, neckY);
    c.stroke();

    // Arms
    c.beginPath();
    if (legendaryAnimationActive) {
        const elapsed = Date.now() - legendaryAnimationTimer;
        if (elapsed < 1000) {
            // Phase 1: Hands pressed to body
            c.moveTo(x, neckY + 8);
            c.lineTo(x - 4, neckY + 24);
            c.lineTo(x - 3, neckY + 40);

            c.moveTo(x, neckY + 8);
            c.lineTo(x + 4, neckY + 24);
            c.lineTo(x + 3, neckY + 40);
        } else {
            // Phase 2: Hands raised up! Interpolated over first 300ms of phase 2
            const progress = Math.min(1, (elapsed - 1000) / 300);

            const leftElbowX = x - 5 - 10 * progress;
            const leftElbowY = neckY + 24 - 32 * progress;
            const leftHandX = x - 3 - 13 * progress;
            const leftHandY = neckY + 40 - 64 * progress;

            const rightElbowX = x + 5 + 10 * progress;
            const rightElbowY = neckY + 24 - 32 * progress;
            const rightHandX = x + 3 + 13 * progress;
            const rightHandY = neckY + 40 - 64 * progress;

            c.moveTo(x, neckY + 8);
            c.lineTo(leftElbowX, leftElbowY);
            c.lineTo(leftHandX, leftHandY);

            c.moveTo(x, neckY + 8);
            c.lineTo(rightElbowX, rightElbowY);
            c.lineTo(rightHandX, rightHandY);
        }
    } else if (emeraldAnimationActive) {
        const elapsed = Date.now() - emeraldAnimationTimer;
        // Left arm hangs down
        c.moveTo(x, neckY + 8);
        c.lineTo(x - 4, neckY + 24);
        c.lineTo(x - 3, neckY + 40);

        if (elapsed < 1000) {
            // Phase 1: Right hand normal/pressed
            c.moveTo(x, neckY + 8);
            c.lineTo(x + 4, neckY + 24);
            c.lineTo(x + 3, neckY + 40);
        } else {
            // Phase 2: Right hand raised up to receive the descending gem
            const progress = Math.min(1, (elapsed - 1000) / 1200);
            const rightElbowX = x + 4 + 8 * progress;
            const rightElbowY = neckY + 24 - 32 * progress;
            const rightHandX = x + 3 + 13 * progress;
            const rightHandY = neckY + 40 - 64 * progress; // lands at neckY - 24

            c.moveTo(x, neckY + 8);
            c.lineTo(rightElbowX, rightElbowY);
            c.lineTo(rightHandX, rightHandY);
        }
    } else if (natureAnimationActive) {
        const elapsed = Date.now() - natureAnimationTimer;
        const progress = Math.min(1, (elapsed - 2500) / 400); // 400ms to fully spread

        // Left arm spreading wide
        const leftHandX = x - 18 - 24 * progress;
        const leftHandY = neckY + 20 - 45 * progress;
        c.moveTo(x, neckY + 8);
        c.lineTo(x - 12, neckY + 16);
        c.lineTo(leftHandX, leftHandY);

        // Right arm spreading wide
        const rightHandX = x + 18 + 24 * progress;
        const rightHandY = neckY + 20 - 45 * progress;
        c.moveTo(x, neckY + 8);
        c.lineTo(x + 12, neckY + 16);
        c.lineTo(rightHandX, rightHandY);
    } else if (state.equippedAura === "glitch") {
        const armSway = Math.sin(Date.now() * 0.003) * 6;
        c.moveTo(x, neckY + 8);
        c.lineTo(x - 22, neckY + 16 + armSway);
        c.lineTo(x - 18, neckY + 32 + armSway * 0.5);

        c.moveTo(x, neckY + 8);
        c.lineTo(x + 22, neckY + 16 - armSway);
        c.lineTo(x + 18, neckY + 32 - armSway * 0.5);
    } else {
        // Left Arm (hanging relaxedly or slightly swaying)
        const armSwing = Math.sin(Date.now() * 0.002) * 4;
        c.moveTo(x, neckY + 8);
        c.lineTo(x - 18, neckY + 20 + armSwing);
        c.lineTo(x - 14, neckY + 38 + armSwing * 0.5);
        // Right Arm
        c.moveTo(x, neckY + 8);
        c.lineTo(x + 18, neckY + 20 - armSwing);
        c.lineTo(x + 14, neckY + 38 - armSwing * 0.5);
    }
    c.stroke();

    // Render multicolored glitch rectangles over body for glitch aura idle
    if (state.equippedAura === "glitch") {
        drawGlitchRectangles(c, x, y);
    }

    // Render digital binary streams and mini warning blocks for malware aura idle
    if (state.equippedAura === "malware") {
        drawMalwareIdleCorruptions(c, x, y);
    }

    // Head
    drawStickmanHead(c, x, headY, headRadius);

    // COSMETIC ADDITIONS
    if (skin.style === "king") {
        // Gold Crown on head
        c.fillStyle = "#fbbf24";
        c.strokeStyle = "#d97706";
        c.lineWidth = 1;
        c.beginPath();
        c.moveTo(x - 8, headY - 8);
        c.lineTo(x - 10, headY - 18);
        c.lineTo(x - 4, headY - 13);
        c.lineTo(x, headY - 21);
        c.lineTo(x + 4, headY - 13);
        c.lineTo(x + 10, headY - 18);
        c.lineTo(x + 8, headY - 8);
        c.closePath();
        c.fill();
        c.stroke();
    } else if (skin.style === "knight") {
        // Knight Helmet crest line & shield or sword on back
        // Red plumes
        c.strokeStyle = "#ef4444";
        c.lineWidth = 3;
        c.beginPath();
        c.arc(x, headY - 4, headRadius + 3, Math.PI * 1.1, Math.PI * 1.5);
        c.stroke();
    }

    if (state.equippedAura === "nature") {
        // Draw flower crown on the head (pink, white, yellow blossoms with green leaves)
        c.save();
        // Draw crown base (green vine line)
        c.strokeStyle = "#15803d";
        c.lineWidth = 2.5;
        c.beginPath();
        c.arc(x, headY - 4, headRadius + 1, Math.PI * 0.9, Math.PI * 2.1);
        c.stroke();

        // Draw small flowers along the vine
        const flowers = [
            { dx: -7, dy: -8, color: "#ec4899" }, // Pink
            { dx: 0, dy: -12, color: "#facc15" },  // Yellow
            { dx: 7, dy: -8, color: "#ffffff" }   // White
        ];

        flowers.forEach(f => {
            const fx = x + f.dx;
            const fy = headY + f.dy;
            c.fillStyle = f.color;
            c.beginPath();
            c.arc(fx, fy, 2.5, 0, Math.PI * 2);
            c.fill();
            c.fillStyle = "#f97316";
            c.beginPath();
            c.arc(fx, fy, 0.9, 0, Math.PI * 2);
            c.fill();
        });
        c.restore();
    } else if (skin.style === "shadow") {
        // Floating shadow particles rising from human
        if (Math.random() < 0.15) {
            particles.push(new Particle(
                x + (Math.random() * 20 - 10),
                y - (Math.random() * 60),
                "#4f46e5",
                {
                    vx: Math.random() * 0.6 - 0.3,
                    vy: -Math.random() * 0.5 - 0.2,
                    size: Math.random() * 3 + 1,
                    decay: 0.02
                }
            ));
        }
    }

    c.restore();
}

// Draw Wind Aura Fluffy Cloud
function drawWindCloud(c, x, y, ts) {
    c.save();
    c.shadowColor = "#85e3ff";
    c.shadowBlur = 8;

    // Soft glowing cloud circles
    const t = ts * 0.003;
    c.fillStyle = "rgba(224, 242, 254, 0.85)";
    c.beginPath();
    // main center
    c.arc(x + Math.sin(t) * 3, y, 16, 0, Math.PI * 2);
    // left bump
    c.arc(x - 14 + Math.sin(t + 1) * 2, y + 4, 11, 0, Math.PI * 2);
    // right bump
    c.arc(x + 14 + Math.sin(t + 2) * 2, y + 3, 12, 0, Math.PI * 2);
    // top bump
    c.arc(x + 2, y - 8, 11, 0, Math.PI * 2);
    c.fill();

    // Occasional wind streaks falling down
    if (Math.random() < 0.12) {
        particles.push(new Particle(
            x + (Math.random() * 30 - 15),
            y + 10,
            "rgba(255,255,255,0.7)",
            {
                vx: (Math.random() * 0.2 - 0.1),
                vy: Math.random() * 3 + 2, // fall down
                size: Math.random() * 1.5 + 0.5,
                shape: "circle",
                decay: 0.04
            }
        ));
    }

    c.restore();
}

// Draw Legendary chest giant spinning star
function drawLegendaryChestStar(c, x, y, ts) {
    c.save();
    c.shadowColor = "#eab308";
    c.shadowBlur = 15;

    // Large golden star spinning slowly
    const rotation = ts * 0.002;
    c.translate(x, y);
    c.rotate(rotation);
    drawStar(c, 0, 0, 5, 12, 5, "#facc15");

    c.restore();
}

// Draw Faceted Emerald Gem Shape
function drawEmeraldShape(c, x, y, size) {
    c.save();
    c.translate(x, y);
    c.beginPath();
    c.moveTo(0, -size);
    c.lineTo(size * 0.6, -size * 0.2);
    c.lineTo(size * 0.6, size * 0.2);
    c.lineTo(0, size);
    c.lineTo(-size * 0.6, size * 0.2);
    c.lineTo(-size * 0.6, -size * 0.2);
    c.closePath();

    c.fillStyle = "#10b981";
    c.fill();

    // Facet lines for diamond look
    c.strokeStyle = "#a7f3d0";
    c.lineWidth = 1;
    c.beginPath();
    c.moveTo(0, -size);
    c.lineTo(0, size);
    c.moveTo(-size * 0.6, -size * 0.2);
    c.lineTo(size * 0.6, size * 0.2);
    c.moveTo(-size * 0.6, size * 0.2);
    c.lineTo(size * 0.6, -size * 0.2);
    c.stroke();
    c.restore();
}

// Draw the Emerald Aura gems on player shoulders
function drawEmeraldAuraGems(c, x, y, ts) {
    const shoulderY = y - 48; // Torso level
    const hoverOffset = Math.sin(ts * 0.004) * 2.5; // slow hovering

    c.save();
    c.shadowColor = "#34d399";
    c.shadowBlur = 10;

    // Left Emerald
    drawEmeraldShape(c, x - 13, shoulderY - 5 + hoverOffset, 7);

    // Right Emerald
    drawEmeraldShape(c, x + 13, shoulderY - 5 - hoverOffset, 7);

    c.restore();
}

// Draw custom sleeping pose stickman with sleeping cap
function drawSleepingPose(c, x, y, ts, skin) {
    const bob = Math.sin(ts * 0.002) * 1.5; // very gentle breathing bob
    const sleepY = y - 10 + bob;

    // 1. Draw Pillow / Head Cloud
    c.fillStyle = "rgba(255, 255, 255, 0.85)";
    c.beginPath();
    c.arc(x - 24, sleepY + 2, 6, 0, Math.PI * 2);
    c.arc(x - 20, sleepY, 8, 0, Math.PI * 2);
    c.arc(x - 16, sleepY + 3, 6, 0, Math.PI * 2);
    c.fill();

    // 2. Draw Stickman Body
    c.beginPath();
    // Spine (horizontal)
    c.moveTo(x - 15, sleepY);
    c.lineTo(x + 15, sleepY);

    // Left leg (bent knee)
    c.moveTo(x + 15, sleepY);
    c.lineTo(x + 26, sleepY - 6);
    c.lineTo(x + 32, sleepY);

    // Right leg (straight)
    c.moveTo(x + 15, sleepY);
    c.lineTo(x + 35, sleepY);

    // Left arm (on stomach)
    c.moveTo(x - 8, sleepY);
    c.lineTo(x, sleepY + 6);
    c.lineTo(x + 8, sleepY);

    // Right arm (under head)
    c.moveTo(x - 8, sleepY);
    c.lineTo(x - 16, sleepY + 4);
    c.lineTo(x - 22, sleepY);

    c.stroke();

    // Head
    if (skin && skin.color) {
        c.fillStyle = skin.color;
    }
    drawStickmanHead(c, x - 20, sleepY - 6, 8);

    // 3. Sleeping Cap (Nightcap)
    c.fillStyle = "#60a5fa"; // Bluish cap
    c.strokeStyle = "#3b82f6";
    c.lineWidth = 1;
    c.beginPath();
    c.moveTo(x - 26, sleepY - 10);
    c.lineTo(x - 15, sleepY - 11);
    c.lineTo(x - 30, sleepY - 18); // Tip points left
    c.closePath();
    c.fill();
    c.stroke();

    // Little white pom-pom on tip
    c.fillStyle = "#ffffff";
    c.beginPath();
    c.arc(x - 31, sleepY - 18, 2.5, 0, Math.PI * 2);
    c.fill();
}

// Draw fluffy bed of clouds under sleeping character
function drawRelaxedClouds(c, x, y, scale = 1) {
    c.save();
    c.shadowColor = "#93c5fd";
    c.shadowBlur = 10;

    c.fillStyle = "rgba(240, 246, 255, 0.9)";

    c.beginPath();
    // Left cloud part
    c.arc(x - 28 * scale, y - 6 * scale, 12 * scale, 0, Math.PI * 2);
    // Center cloud part
    c.arc(x, y - 8 * scale, 15 * scale, 0, Math.PI * 2);
    // Right cloud part
    c.arc(x + 28 * scale, y - 6 * scale, 12 * scale, 0, Math.PI * 2);
    // Bottom filling cloud parts
    c.arc(x - 14 * scale, y - 3 * scale, 10 * scale, 0, Math.PI * 2);
    c.arc(x + 14 * scale, y - 3 * scale, 10 * scale, 0, Math.PI * 2);
    c.fill();

    c.restore();
}

// Draw shifting toxic-green nature cloud
function drawNatureCloud(c, x, y) {
    c.save();
    c.shadowColor = "#22c55e";
    c.shadowBlur = 15;

    const t = Date.now() * 0.002;
    const colors = ["rgba(34, 197, 94, 0.4)", "rgba(57, 255, 20, 0.25)", "rgba(163, 230, 53, 0.2)"];

    colors.forEach((col, idx) => {
        c.fillStyle = col;
        const shiftX = Math.sin(t + idx * 1.5) * 6;
        const shiftY = Math.cos(t * 0.8 + idx * 2.0) * 2;

        c.beginPath();
        // Center part
        c.arc(x + shiftX, y + 4 + shiftY, 22 - idx * 4, 0, Math.PI * 2);
        // Left wing
        c.arc(x - 22 + shiftX * 0.5, y + 6 - shiftY, 16 - idx * 3, 0, Math.PI * 2);
        // Right wing
        c.arc(x + 22 - shiftX * 0.7, y + 5 + shiftY * 1.2, 18 - idx * 3, 0, Math.PI * 2);
        c.fill();
    });

    c.restore();
}

// Draw custom growing and bursting flower bud for Nature Aura reveal
function drawNatureFlowerBud(c, x, y, elapsed) {
    if (elapsed < 1500) {
        // Phase 1: Growing and closing
        const progress = elapsed / 1500;
        drawFlowerBudBase(c, x, y, progress, false);
    } else if (elapsed >= 1500 && elapsed < 2500) {
        // Phase 2: Closed and shaking
        const shakeX = Math.sin(elapsed * 0.08) * 2;
        const shakeY = Math.cos(elapsed * 0.09) * 1.5;

        // Glowing cracks leaking green energy
        c.save();
        c.shadowColor = "#39ff14";
        c.shadowBlur = 12;
        c.fillStyle = "rgba(57, 255, 20, 0.45)";
        c.beginPath();
        c.arc(x + shakeX, y - 40 + shakeY, 32, 0, Math.PI * 2);
        c.fill();
        c.restore();

        drawFlowerBudBase(c, x + shakeX, y + shakeY, 1.0, true);
    } else if (elapsed >= 2500 && elapsed < 3500) {
        // Phase 3: Tearing apart and flying away
        const p = (elapsed - 2500) / 1000; // 0 to 1
        drawFlowerBurst(c, x, y, p);
    }
}

function drawFlowerBudBase(c, x, y, progress, isShaking) {
    c.save();
    c.lineWidth = 2.5;

    // Scale up the bud as it grows
    const scale = 0.3 + 0.75 * progress;
    c.translate(x, y);
    c.scale(scale, scale);

    // Animate petal closure
    const angle = (1 - progress) * (Math.PI * 0.45);

    // Draw outer green sepals/leaves
    c.fillStyle = "#16a34a";
    c.strokeStyle = "#14532d";

    c.save();
    c.rotate(-angle - 0.2);
    drawSinglePetal(c, 0, 0, 80, 24);
    c.restore();

    c.save();
    c.rotate(angle + 0.2);
    drawSinglePetal(c, 0, 0, 80, -24);
    c.restore();

    // Draw inner pink petals
    const petalColors = ["#f472b6", "#ec4899", "#db2777"];
    petalColors.forEach((color, idx) => {
        c.fillStyle = color;
        c.strokeStyle = "#9d174d";

        c.save();
        c.rotate(-angle * (1 - idx * 0.12));
        drawSinglePetal(c, 0, 0, 75 - idx * 4, 20);
        c.restore();

        c.save();
        c.rotate(angle * (1 - idx * 0.12));
        drawSinglePetal(c, 0, 0, 75 - idx * 4, -20);
        c.restore();
    });

    c.restore();
}

function drawSinglePetal(c, x, y, length, width) {
    c.beginPath();
    c.moveTo(x, y);
    c.quadraticCurveTo(x - width, y - length * 0.5, x, y - length);
    c.quadraticCurveTo(x + width, y - length * 0.5, x, y);
    c.closePath();
    c.fill();
    c.stroke();
}

function drawFlowerBurst(c, x, y, p) {
    c.save();
    c.globalAlpha = Math.max(0, 1 - p * 1.2);

    const distance = p * 150;
    const spin = p * Math.PI * 1.5;

    // Left outer leaf
    c.save();
    c.translate(x - distance, y - 20 - distance * 0.2);
    c.rotate(-spin - 0.5);
    c.fillStyle = "#16a34a";
    c.strokeStyle = "#14532d";
    drawSinglePetal(c, 0, 0, 80, 24);
    c.restore();

    // Right outer leaf
    c.save();
    c.translate(x + distance, y - 20 - distance * 0.2);
    c.rotate(spin + 0.5);
    c.fillStyle = "#16a34a";
    c.strokeStyle = "#14532d";
    drawSinglePetal(c, 0, 0, 80, -24);
    c.restore();

    // Pink petals flying away in all directions
    const angles = [-Math.PI * 0.35, -Math.PI * 0.15, Math.PI * 0.15, Math.PI * 0.35];
    angles.forEach((ang, idx) => {
        const dx = Math.sin(ang) * distance;
        const dy = -Math.cos(ang) * distance - 20;

        c.save();
        c.translate(x + dx, y + dy);
        c.rotate(ang + (idx % 2 === 0 ? spin : -spin));
        c.fillStyle = idx % 2 === 0 ? "#ec4899" : "#db2777";
        c.strokeStyle = "#9d174d";
        drawSinglePetal(c, 0, 0, 75, 20);
        c.restore();
    });

    c.restore();
}

// Draw Malware Aura reveal cutscene warning popups, scanlines, and binary streams
function drawMalwareCutsceneEffects(c, x, y, elapsed) {
    // 1. Scanline scan animation
    const scanY = y - 75 + ((elapsed * 0.08) % 85);
    c.save();
    c.strokeStyle = "rgba(255, 0, 85, 0.4)";
    c.lineWidth = 2.5;
    c.shadowColor = "#ff0055";
    c.shadowBlur = 8;
    c.beginPath();
    c.moveTo(x - 45, scanY);
    c.lineTo(x + 45, scanY);
    c.stroke();
    c.restore();

    // 2. Warning popups (drawn around the player at fixed positions but with slight glitch offset)
    if (elapsed >= 1200 && elapsed < 3500) {
        const popups = [
            { dx: -75, dy: -90, w: 60, h: 35, title: "ERR", text: "0x800F" },
            { dx: 45, dy: -55, w: 70, h: 40, title: "ALERT", text: "SYSTEM" },
            { dx: -85, dy: -25, w: 65, h: 35, title: "DANGER", text: "TROJAN" }
        ];

        popups.forEach((pop, idx) => {
            // Show them sequentially
            if (elapsed < 1200 + idx * 550) return;

            c.save();
            c.translate(x + pop.dx, y + pop.dy);
            // Glitchy twitch
            if (Math.random() < 0.15) {
                c.translate((Math.random() - 0.5) * 5, (Math.random() - 0.5) * 3);
            }

            // Outer popup window box
            c.fillStyle = "rgba(10, 6, 20, 0.92)";
            c.strokeStyle = "#ff0055";
            c.lineWidth = 1.5;
            c.shadowColor = "#ff0055";
            c.shadowBlur = 6;
            c.fillRect(0, 0, pop.w, pop.h);
            c.strokeRect(0, 0, pop.w, pop.h);

            // Window title header bar
            c.fillStyle = "#ff0055";
            c.fillRect(0, 0, pop.w, 11);

            c.fillStyle = "#ffffff";
            c.font = "bold 8px Courier New";
            c.fillText(pop.title, 4, 8);

            // Window inner content text
            c.fillStyle = "#ff0055";
            c.font = "bold 9px monospace";
            c.fillText(pop.text, 6, 25);

            c.restore();
        });
    }

    // 3. Screen flash at core explosion trigger time (3500ms)
    if (elapsed >= 3500 && elapsed < 4100) {
        const p = (elapsed - 3500) / 600;
        c.save();
        const flashAlpha = Math.max(0, 1 - p);
        c.fillStyle = `rgba(255, 0, 85, ${flashAlpha * 0.45})`;
        c.fillRect(0, 0, c.canvas.width / (window.devicePixelRatio || 1), c.canvas.height / (window.devicePixelRatio || 1));
        c.restore();
    }
}

// Draw digital binary streams and mini warning blocks on character body for Malware Aura idle state
function drawMalwareIdleCorruptions(c, x, y) {
    c.save();
    // Draw occasional glitchy red scan/error bars on body
    const numBars = Math.floor(Math.random() * 3) + 2;
    c.fillStyle = "rgba(255, 0, 85, 0.75)";
    for (let i = 0; i < numBars; i++) {
        const bx = x + (Math.random() * 22 - 11);
        const by = y - 75 + (Math.random() * 70);
        const bw = Math.random() * 14 + 4;
        const bh = Math.random() * 3.5 + 1.5;
        c.fillRect(bx, by, bw, bh);
    }

    // Draw tiny red caution marks/warnings floating around the player
    if (Math.random() < 0.12) {
        c.fillStyle = "#ff0055";
        c.font = "bold 9px Courier New";
        c.fillText("⚠️", x + (Math.random() * 55 - 27), y - 20 - Math.random() * 55);
    }
    c.restore();
}

// Draw elliptical fiery portal to underworld under the player's feet
function drawDemonPortal(c, cx, cy, elapsed) {
    let scale = 1.0;
    if (demonAnimationActive) {
        const time = Date.now() - demonAnimationTimer;
        if (time < 800) {
            scale = time / 800;
        } else if (time < 3500) {
            scale = 1.0;
        } else if (time < 4500) {
            scale = Math.max(0, 1 - (time - 3500) / 1000);
        } else {
            scale = 0;
        }
    }

    if (scale <= 0) return;

    c.save();
    c.translate(cx, cy);
    c.scale(scale, scale);

    // Draw outer dark smoky ellipse
    c.shadowColor = "#ff3300";
    c.shadowBlur = 15;
    c.fillStyle = "rgba(20, 5, 5, 0.85)";
    c.beginPath();
    c.ellipse(0, 0, 55, 12, 0, 0, Math.PI * 2);
    c.fill();

    // Concentric fiery rings with alpha and slight wave/pulsation
    const pulse1 = 1 + Math.sin(elapsed * 0.006) * 0.05;
    const pulse2 = 1 + Math.cos(elapsed * 0.008) * 0.08;

    // Outer red glow ring
    c.strokeStyle = "rgba(255, 0, 0, 0.7)";
    c.lineWidth = 4;
    c.beginPath();
    c.ellipse(0, 0, 50 * pulse1, 10 * pulse1, 0, 0, Math.PI * 2);
    c.stroke();

    // Inner orange hot ring
    c.strokeStyle = "rgba(255, 102, 0, 0.9)";
    c.lineWidth = 3;
    c.beginPath();
    c.ellipse(0, 0, 38 * pulse2, 8 * pulse2, 0, 0, Math.PI * 2);
    c.stroke();

    // Central bright yellow core
    c.fillStyle = "rgba(255, 204, 0, 0.95)";
    c.shadowColor = "#ffcc00";
    c.shadowBlur = 8;
    c.beginPath();
    c.ellipse(0, 0, 24, 5, 0, 0, Math.PI * 2);
    c.fill();

    // Draw minor flame licking elements upward from the portal
    const numFlames = 6;
    for (let i = 0; i < numFlames; i++) {
        const offsetAngle = (i / numFlames) * Math.PI * 2;
        const fx = Math.cos(offsetAngle) * (30 + Math.sin(elapsed * 0.01 + i) * 6);
        const fy = Math.sin(offsetAngle) * 6;

        c.fillStyle = i % 2 === 0 ? "#ff3300" : "#ffaa00";
        c.beginPath();
        c.moveTo(fx - 4, fy);
        c.quadraticCurveTo(fx, fy - 22 - (Math.sin(elapsed * 0.005 + i) * 8), fx + 4, fy);
        c.closePath();
        c.fill();
    }

    c.restore();
}

// Draw blue crescent moon
function drawCrescentMoon(c, cx, cy, radius, ts) {
    c.save();
    c.shadowColor = "#60a5fa";
    c.shadowBlur = 12;
    c.fillStyle = "#93c5fd";

    // Gentle rotation sway
    const sway = Math.sin(ts * 0.001) * 0.08;
    c.translate(cx, cy);
    c.rotate(sway);

    // Draw moon shape (C shape)
    c.beginPath();
    c.arc(0, 0, radius, -Math.PI * 0.6, Math.PI * 0.8);
    // Inner arc to cut it out
    c.arc(radius * 0.5, 0, radius * 0.9, Math.PI * 0.8, -Math.PI * 0.6, true);
    c.closePath();
    c.fill();
    c.restore();
}

// Draw yawn/stretch pose stickman (for Relaxed Aura reveal Phase 1)
function drawYawningPose(c, x, y, skin) {
    const torsoY = y - 14;
    const neckY = y - 56;
    const headY = y - 68;
    const headRadius = 10;

    // Legs
    c.beginPath();
    c.moveTo(x, torsoY);
    c.lineTo(x - 12, y - 5);
    c.lineTo(x - 16, y);
    c.moveTo(x, torsoY);
    c.lineTo(x + 12, y - 5);
    c.lineTo(x + 16, y);
    c.stroke();

    // Torso / Spine
    c.beginPath();
    c.moveTo(x, torsoY);
    c.lineTo(x, neckY);
    c.stroke();

    // Yawning arms (bent to head level)
    c.beginPath();
    c.moveTo(x, neckY + 8);
    c.lineTo(x - 10, neckY + 12);
    c.lineTo(x - 8, neckY - 2);

    c.moveTo(x, neckY + 8);
    c.lineTo(x + 10, neckY + 12);
    c.lineTo(x + 8, neckY - 2);
    c.stroke();

    // Head
    drawStickmanHead(c, x, headY, headRadius);

    // Crown/Knight details
    if (skin.style === "king") {
        c.fillStyle = "#fbbf24";
        c.strokeStyle = "#d97706";
        c.lineWidth = 1;
        c.beginPath();
        c.moveTo(x - 8, headY - 8);
        c.lineTo(x - 10, headY - 18);
        c.lineTo(x - 4, headY - 13);
        c.lineTo(x, headY - 21);
        c.lineTo(x + 4, headY - 13);
        c.lineTo(x + 10, headY - 18);
        c.lineTo(x + 8, headY - 8);
        c.closePath();
        c.fill();
        c.stroke();
    } else if (skin.style === "knight") {
        c.strokeStyle = "#ef4444";
        c.lineWidth = 3;
        c.beginPath();
        c.arc(x, headY - 4, headRadius + 3, Math.PI * 1.1, Math.PI * 1.5);
        c.stroke();
    }
}

// AURA PARTICLE GENERATION
function generateAuraParticles(x, y, ts) {
    if (state.settings && !state.settings.effectsEnabled) return;
    const tier = state.equippedAura;

    // Suppress legendary particles during charging animation (Phase 1)
    if (tier === "legendary" && legendaryAnimationActive) {
        const elapsed = Date.now() - legendaryAnimationTimer;
        if (elapsed < 1000) return;
    }

    // Suppress emerald particles during descending gem animation (Phase 1 & 2)
    if (tier === "emerald" && emeraldAnimationActive) {
        const elapsed = Date.now() - emeraldAnimationTimer;
        if (elapsed < 2200) return;
    }

    // Suppress relaxed particles during yawn and lie down phases (Phase 1 & 2)
    if (tier === "relaxed" && relaxedAnimationActive) {
        const elapsed = Date.now() - relaxedAnimationTimer;
        if (elapsed < 2800) return;
    }

    // Suppress nature particles during sprout and closed bud phases (Phase 1 & 2)
    if (tier === "nature" && natureAnimationActive) {
        const elapsed = Date.now() - natureAnimationTimer;
        if (elapsed < 2500) return;
    }

    // Suppress earth particles during star and transformation phases (Phase 1 to 5)
    if (tier === "earth" && earthAnimationActive) {
        const elapsed = Date.now() - earthAnimationTimer;
        if (elapsed < 5400) return;
    }

    if (tier === "common") {
        // Grey cloud circles floating up
        if (Math.random() < 0.25) {
            particles.push(new Particle(
                x + (Math.random() * 40 - 20),
                y - (Math.random() * 10),
                "rgba(156, 163, 175, 0.2)",
                {
                    vx: Math.random() * 0.8 - 0.4,
                    vy: -Math.random() * 0.8 - 0.4,
                    size: Math.random() * 8 + 6,
                    growth: 0.1,
                    decay: 0.015
                }
            ));
        }
    }

    else if (tier === "uncommon") {
        // Green cloud & tiny neon leaves
        if (Math.random() < 0.3) {
            particles.push(new Particle(
                x + (Math.random() * 40 - 20),
                y - (Math.random() * 10),
                "rgba(34, 197, 94, 0.22)",
                {
                    vx: Math.random() * 0.8 - 0.4,
                    vy: -Math.random() * 0.8 - 0.4,
                    size: Math.random() * 8 + 6,
                    growth: 0.08,
                    decay: 0.015
                }
            ));
        }
        if (Math.random() < 0.15) {
            particles.push(new Particle(
                x + (Math.random() * 26 - 13),
                y - (Math.random() * 50),
                "#4ade80",
                {
                    vx: Math.random() * 1.2 - 0.6,
                    vy: -Math.random() * 1 - 0.5,
                    size: Math.random() * 3 + 2,
                    shape: "leaf",
                    decay: 0.02
                }
            ));
        }
    }

    else if (tier === "rare") {
        // Intense bright blue cloud + sparks + ground expand ring ripples
        if (Math.random() < 0.35) {
            particles.push(new Particle(
                x + (Math.random() * 44 - 22),
                y - (Math.random() * 10),
                "rgba(14, 165, 233, 0.25)",
                {
                    vx: Math.random() * 0.8 - 0.4,
                    vy: -Math.random() * 1 - 0.5,
                    size: Math.random() * 10 + 6,
                    growth: 0.12,
                    decay: 0.018
                }
            ));
        }
        if (Math.random() < 0.2) {
            particles.push(new Particle(
                x + (Math.random() * 30 - 15),
                y - (Math.random() * 45),
                "#38bdf8",
                {
                    vx: Math.random() * 1.6 - 0.8,
                    vy: -Math.random() * 1.5 - 0.8,
                    size: Math.random() * 2.5 + 1.5,
                    shape: "circle",
                    decay: 0.025
                }
            ));
        }
        // Ripple on floor
        if (Math.random() < 0.03) {
            particles.push(new Particle(
                x,
                y,
                "rgba(14, 165, 233, 0.6)",
                {
                    vx: 0, vy: 0,
                    size: 10,
                    growth: 2,
                    maxSize: 90,
                    shape: "ripple",
                    decay: 0.02
                }
            ));
        }
    }

    else if (tier === "epic") {
        // Purple magical cloud & shooting stars
        if (Math.random() < 0.3) {
            particles.push(new Particle(
                x + (Math.random() * 40 - 20),
                y - (Math.random() * 10),
                "rgba(168, 85, 247, 0.22)",
                {
                    vx: Math.random() * 0.6 - 0.3,
                    vy: -Math.random() * 0.8 - 0.4,
                    size: Math.random() * 12 + 6,
                    growth: 0.1,
                    decay: 0.015
                }
            ));
        }
        if (Math.random() < 0.22) {
            particles.push(new Particle(
                x + (Math.random() * 36 - 18),
                y - (Math.random() * 60),
                "#c084fc",
                {
                    vx: Math.random() * 1.8 - 0.9,
                    vy: -Math.random() * 2.0 - 0.5,
                    size: Math.random() * 6 + 3,
                    shape: "star",
                    decay: 0.018
                }
            ));
        }
    }

    else if (tier === "wind") {
        // Wind spirals wrapping around stickman, soft cyan cloud sparkles
        if (Math.random() < 0.15) {
            // Particle that spirals
            const radius = 24;
            const speed = 0.12;
            const startAngle = Math.random() * Math.PI * 2;

            particles.push(new Particle(
                x, y,
                "rgba(255, 255, 255, 0.75)",
                {
                    vx: 0, vy: -1.6,
                    size: Math.random() * 2.5 + 1,
                    decay: 0.018,
                    customDraw: function (c, size, color) {
                        const age = (1 - this.alpha) / this.decay;
                        const angle = startAngle + age * speed;
                        const px = Math.cos(angle) * radius;

                        // We offset the canvas position
                        c.beginPath();
                        c.arc(px, 0, size, 0, Math.PI * 2);
                        c.fillStyle = color;
                        c.fill();
                    }
                }
            ));
        }
        // Swirling dust particles
        if (Math.random() < 0.25) {
            particles.push(new Particle(
                x + (Math.random() * 50 - 25),
                y - (Math.random() * 70),
                "rgba(103, 232, 249, 0.25)",
                {
                    vx: Math.random() * 2 - 1,
                    vy: -Math.random() * 0.8 - 0.4,
                    size: Math.random() * 6 + 4,
                    growth: 0.05,
                    decay: 0.02
                }
            ));
        }
    }

    else if (tier === "water") {
        // Waterfall drops cascading down body, ripples spreading on floor
        // Water drops from shoulders/head
        if (Math.random() < 0.45) {
            particles.push(new Particle(
                x + (Math.random() * 20 - 10),
                y - 60 - (Math.random() * 15),
                "rgba(59, 130, 246, 0.75)",
                {
                    vx: Math.random() * 0.4 - 0.2,
                    vy: Math.random() * 1.5 + 1.5, // move down (waterfall)
                    gravity: 0.15,
                    shape: "drop",
                    size: Math.random() * 3 + 2,
                    decay: 0.03
                }
            ));
        }
        // Waves/Ripples on platform
        if (Math.random() < 0.06) {
            particles.push(new Particle(
                x,
                y,
                "rgba(37, 99, 235, 0.7)",
                {
                    vx: 0, vy: 0,
                    size: 8,
                    growth: 2.2,
                    maxSize: 100,
                    shape: "ripple",
                    decay: 0.022
                }
            ));
        }
        // Splash drops hitting the ground
        if (Math.random() < 0.2) {
            particles.push(new Particle(
                x + (Math.random() * 80 - 40),
                y,
                "rgba(96, 165, 250, 0.7)",
                {
                    vx: Math.random() * 2 - 1,
                    vy: -Math.random() * 1.5 - 0.5,
                    gravity: 0.15,
                    size: Math.random() * 2 + 1,
                    decay: 0.04
                }
            ));
        }
    }

    else if (tier === "legendary") {
        // Massive golden rising beams, golden sparkles, screen shake pulses
        if (Math.random() < 0.18) {
            // Golden rising ray
            const beamWidth = Math.random() * 12 + 6;
            particles.push(new Particle(
                x + (Math.random() * 80 - 40),
                y,
                "rgba(253, 224, 71, 0.18)",
                {
                    vx: 0,
                    vy: -Math.random() * 4 - 3,
                    size: beamWidth,
                    decay: 0.012,
                    customDraw: function (c, size, color) {
                        c.fillStyle = color;
                        c.fillRect(-size / 2, 0, size, -200); // long rectangle beam
                    }
                }
            ));
        }
        // Rising gold sparkle stars
        if (Math.random() < 0.35) {
            particles.push(new Particle(
                x + (Math.random() * 60 - 30),
                y - (Math.random() * 20),
                "#facc15",
                {
                    vx: Math.random() * 1.2 - 0.6,
                    vy: -Math.random() * 2.5 - 1,
                    size: Math.random() * 6 + 3,
                    shape: "star",
                    decay: 0.018
                }
            ));
        }
        // Ambient golden fog cloud
        if (Math.random() < 0.4) {
            particles.push(new Particle(
                x + (Math.random() * 50 - 25),
                y - (Math.random() * 10),
                "rgba(234, 179, 8, 0.15)",
                {
                    vx: Math.random() * 0.8 - 0.4,
                    vy: -Math.random() * 1.2 - 0.4,
                    size: Math.random() * 15 + 8,
                    growth: 0.15,
                    decay: 0.012
                }
            ));
        }
        // Expanding bright gold ripples on chest level
        if (Math.random() < 0.015) {
            particles.push(new Particle(
                x,
                y - 50,
                "rgba(254, 240, 138, 0.4)",
                {
                    vx: 0, vy: 0,
                    size: 5,
                    growth: 3,
                    maxSize: 110,
                    shape: "ripple",
                    decay: 0.025
                }
            ));
        }
    }

    else if (tier === "emerald") {
        // Falling emerald gems
        if (Math.random() < 0.28) {
            const spawnX = x + (Math.random() * 140 - 70);
            const spawnY = y - 250 - (Math.random() * 50);
            particles.push(new Particle(
                spawnX, spawnY,
                "#10b981",
                {
                    vx: Math.random() * 0.6 - 0.3,
                    vy: Math.random() * 2 + 2, // falling down
                    size: Math.random() * 4 + 2,
                    decay: 0.008,
                    customDraw: function (c, size, color) {
                        c.beginPath();
                        c.moveTo(0, -size);
                        c.lineTo(size * 0.6, -size * 0.2);
                        c.lineTo(size * 0.6, size * 0.2);
                        c.lineTo(0, size);
                        c.lineTo(-size * 0.6, size * 0.2);
                        c.lineTo(-size * 0.6, -size * 0.2);
                        c.closePath();
                        c.fillStyle = color;
                        c.fill();
                        // shine facet
                        c.strokeStyle = "#a7f3d0";
                        c.lineWidth = 0.5;
                        c.stroke();
                    }
                }
            ));
        }
        // Small rising green sparkles for ambient look
        if (Math.random() < 0.15) {
            particles.push(new Particle(
                x + (Math.random() * 40 - 20),
                y - (Math.random() * 15),
                "#34d399",
                {
                    vx: Math.random() * 0.8 - 0.4,
                    vy: -Math.random() * 1.5 - 0.5,
                    size: Math.random() * 3 + 1.5,
                    shape: "star",
                    decay: 0.02
                }
            ));
        }
    }

    else if (tier === "relaxed") {
        // Zzz sleeping text particles
        if (Math.random() < 0.05) {
            particles.push(new Particle(
                x - 20 + (Math.random() * 8 - 4),
                y - 20,
                "#a5f3fc",
                {
                    vx: Math.random() * 0.4 - 0.2,
                    vy: -Math.random() * 0.5 - 0.3,
                    size: 6,
                    growth: 0.08,
                    maxSize: 13,
                    shape: "zzz",
                    decay: 0.012
                }
            ));
        }
        // Small rising bluish sparks
        if (Math.random() < 0.16) {
            particles.push(new Particle(
                x + (Math.random() * 70 - 35),
                y - 10 - (Math.random() * 50),
                "#93c5fd",
                {
                    vx: Math.random() * 0.6 - 0.3,
                    vy: -Math.random() * 1.0 - 0.2,
                    size: Math.random() * 4 + 2,
                    shape: "star",
                    decay: 0.015
                }
            ));
        }
    }

    else if (tier === "nature") {
        // Toxic green mist/fog cloud particles at the feet (y - 5 to y + 10)
        if (Math.random() < 0.25) {
            particles.push(new Particle(
                x + (Math.random() * 50 - 25),
                y + (Math.random() * 10 - 5),
                "rgba(57, 255, 20, 0.35)", // toxic green cloud
                {
                    vx: Math.random() * 0.8 - 0.4,
                    vy: -Math.random() * 0.3 - 0.1,
                    size: Math.random() * 8 + 6,
                    growth: 0.15,
                    maxSize: 30,
                    shape: "circle",
                    decay: 0.012
                }
            ));
        }
        // Circling/falling leaves
        if (Math.random() < 0.12) {
            particles.push(new Particle(
                x + (Math.random() * 70 - 35),
                y - 60 - Math.random() * 40, // spawn above
                Math.random() < 0.5 ? "#22c55e" : "#15803d", // forest green or leaf green
                {
                    vx: Math.random() * 1.2 - 0.6,
                    vy: Math.random() * 0.8 + 0.6, // fall down
                    size: Math.random() * 5 + 3,
                    shape: "leaf",
                    decay: 0.01
                }
            ));
        }
    }

    else if (tier === "malware") {
        // Malware Aura Particles: Green falling digital rain & red glitchy warnings

        // 1. Green Matrix Digital Code (particles falling down)
        if (Math.random() < 0.45) {
            const spawnX = x + (Math.random() * 80 - 40);
            const spawnY = y - 70 - (Math.random() * 20); // spawn above head
            particles.push(new Particle(
                spawnX, spawnY,
                "#00ff66",
                {
                    vx: 0,
                    vy: Math.random() * 1.5 + 2.0, // falling down
                    size: Math.random() * 4 + 2,
                    decay: 0.015,
                    customDraw: function (c, size, color) {
                        c.fillStyle = color;
                        c.font = `bold ${Math.round(size * 2)}px monospace`;
                        // random binary character
                        const char = Math.random() < 0.5 ? "0" : "1";
                        c.fillText(char, 0, 0);
                    }
                }
            ));
        }

        // 2. Red Warnings and Hazard Popups (glitching around character)
        if (Math.random() < 0.08) {
            const spawnX = x + (Math.random() * 100 - 50);
            const spawnY = y - 10 - (Math.random() * 60);
            const warningTexts = ["WARNING", "CORRUPTED", "⚠️", "ERR", "DANGER"];
            const text = warningTexts[Math.floor(Math.random() * warningTexts.length)];

            particles.push(new Particle(
                spawnX, spawnY,
                "#ff0055",
                {
                    vx: Math.random() * 0.4 - 0.2,
                    vy: -Math.random() * 0.4 - 0.2,
                    size: Math.random() * 3 + 7,
                    decay: 0.025,
                    customDraw: function (c, size, color) {
                        c.save();
                        c.fillStyle = color;
                        c.font = `bold ${Math.round(size)}px Courier New`;
                        c.shadowColor = "#ff0055";
                        c.shadowBlur = 6;
                        // Glitch horizontal offset
                        const glitchOffset = Math.sin(Date.now() * 0.1) * 3;
                        c.fillText(text, glitchOffset, 0);
                        c.restore();
                    }
                }
            ));
        }

        // 3. Glitchy Red/Green pixel square sparks
        if (Math.random() < 0.25) {
            particles.push(new Particle(
                x + (Math.random() * 60 - 30),
                y - (Math.random() * 70),
                Math.random() < 0.4 ? "#ff0055" : "#00ff66",
                {
                    vx: Math.random() * 3 - 1.5,
                    vy: -Math.random() * 2 - 0.5,
                    size: Math.random() * 3 + 2,
                    decay: 0.025,
                    customDraw: function (c, size, color) {
                        c.fillStyle = color;
                        c.fillRect(-size / 2, -size / 2, size, size); // square pixel particle
                    }
                }
            ));
        }
    }

    else if (tier === "demon") {
        // Demon Aura Particles: Rising flames, hot embers, and floating dark smoke
        if (Math.random() < 0.45) {
            particles.push(new Particle(
                x + (Math.random() * 60 - 30),
                y - (Math.random() * 20),
                Math.random() < 0.35 ? "#ffcc00" : (Math.random() < 0.7 ? "#ff6600" : "#ff3300"),
                {
                    vx: Math.random() * 1.5 - 0.75,
                    vy: -Math.random() * 2.5 - 1.5,
                    size: Math.random() * 6 + 3,
                    decay: 0.02,
                    customDraw: function (c, size, color) {
                        c.fillStyle = color;
                        c.beginPath();
                        c.moveTo(0, size);
                        c.quadraticCurveTo(-size, 0, 0, -size * 1.5);
                        c.quadraticCurveTo(size, 0, 0, size);
                        c.fill();
                    }
                }
            ));
        }

        if (Math.random() < 0.35) {
            particles.push(new Particle(
                x + (Math.random() * 70 - 35),
                y - (Math.random() * 60),
                "#ffdd44",
                {
                    vx: Math.random() * 0.8 - 0.4,
                    vy: -Math.random() * 3.5 - 2.0,
                    size: Math.random() * 2 + 1,
                    decay: 0.015
                }
            ));
        }

        if (Math.random() < 0.28) {
            particles.push(new Particle(
                x + (Math.random() * 50 - 25),
                y - (Math.random() * 15),
                "rgba(35, 25, 25, 0.45)",
                {
                    vx: Math.random() * 1.2 - 0.6,
                    vy: -Math.random() * 1.0 - 0.5,
                    size: Math.random() * 8 + 4,
                    growth: 0.2,
                    maxSize: 32,
                    decay: 0.015
                }
            ));
        }
    }

    else if (tier === "angel") {
        // Angel Aura Particles: Golden shimmering stars, floating halos, and soft white glows
        if (Math.random() < 0.4) {
            particles.push(new Particle(
                x + (Math.random() * 60 - 30),
                y - 20 - (Math.random() * 40),
                "#fef08a",
                {
                    vx: Math.random() * 0.8 - 0.4,
                    vy: -Math.random() * 1.5 - 0.5,
                    size: Math.random() * 5 + 3,
                    shape: "star",
                    decay: 0.015
                }
            ));
        }

        if (Math.random() < 0.25) {
            particles.push(new Particle(
                x + (Math.random() * 50 - 25),
                y - 30,
                "rgba(254, 240, 138, 0.25)",
                {
                    vx: Math.random() * 0.6 - 0.3,
                    vy: -Math.random() * 0.8 - 0.3,
                    size: Math.random() * 12 + 6,
                    growth: 0.1,
                    maxSize: 28,
                    decay: 0.018
                }
            ));
        }

        if (Math.random() < 0.02) {
            particles.push(new Particle(
                x,
                y - 80,
                "rgba(254, 240, 138, 0.45)",
                {
                    vx: 0,
                    vy: -0.4,
                    size: 8,
                    growth: 1.5,
                    maxSize: 45,
                    shape: "ripple",
                    decay: 0.015
                }
            ));
        }
    }

    else if (tier === "earth") {
        // Soft green/blue mist/dust particles rising from ground
        if (Math.random() < 0.25) {
            particles.push(new Particle(
                x + (Math.random() * 50 - 25),
                y + (Math.random() * 10 - 5),
                Math.random() < 0.5 ? "rgba(59, 130, 246, 0.25)" : "rgba(34, 197, 94, 0.25)",
                {
                    vx: Math.random() * 0.6 - 0.3,
                    vy: -Math.random() * 0.4 - 0.1,
                    size: Math.random() * 8 + 5,
                    growth: 0.1,
                    decay: 0.015
                }
            ));
        }
        // Small brown rocks/pebbles rising/spawning
        if (Math.random() < 0.15) {
            particles.push(new Particle(
                x + (Math.random() * 40 - 20),
                y - (Math.random() * 15),
                "#854d0e",
                {
                    vx: Math.random() * 1.0 - 0.5,
                    vy: -Math.random() * 1.2 - 0.4,
                    size: Math.random() * 3 + 1.5,
                    decay: 0.02,
                    customDraw: function (c, size, color) {
                        drawRock(c, 0, 0, size);
                    }
                }
            ));
        }
        // Swirling green leaves
        if (Math.random() < 0.15) {
            particles.push(new Particle(
                x + (Math.random() * 50 - 25),
                y - 10 - (Math.random() * 50),
                "#16a34a",
                {
                    vx: Math.random() * 1.2 - 0.6,
                    vy: -Math.random() * 0.8 - 0.4,
                    size: Math.random() * 4 + 2,
                    shape: "leaf",
                    decay: 0.015
                }
            ));
        }
    }
}


// ==========================================================================
// 7. RNG GAME LOTTERY LOGIC
// ==========================================================================

// Get actual luck multiplier
function getLuckMultiplier() {
    // Permanent upgrade: level 1 is 1.0x, each level adds 0.2x (level 25 = 5.8x)
    const permanentLuck = 1 + (state.upgrades.luck - 1) * 0.2;
    // Potion booster: 2.0x multiplier if active
    const potionLuck = (state.potionLuckTime > 0) ? 2.0 : 1.0;
    return permanentLuck * potionLuck;
}

// Get roll speed delay in milliseconds
function getRollSpeed() {
    // Level 1 is 1500ms, each level reduces by 55ms (level 25 = 180ms)
    return Math.max(150, 1500 - (state.upgrades.speed - 1) * 55);
}

// Perform Roll
function rollAura() {
    const luck = getLuckMultiplier();

    // Roblox RNG style: roll from rarest to commonest
    // We check against (1 / chance) * luck
    // E.g., for Legendary: 1/100 chance. Multiplied by luck: (luck / 100).
    // Math.random() must be < luck / chance

    // Sort AURAS in descending order of chance (rarest first, i.e. highest chance value)
    const sortedAuras = [...AURAS].sort((a, b) => b.chance - a.chance);

    for (const aura of sortedAuras) {
        // Angel Aura displays as 1/7500 in the UI, but internally has a math chance of 1500
        // so it scales linearly with luck and is achievable at 10x luck (1/150 probability)
        const mathChance = aura.id === "angel" ? 1500 : aura.chance;
        const targetProbability = luck / mathChance;
        if (Math.random() < targetProbability) {
            return aura;
        }
    }

    // Fallback default
    return AURAS.find(a => a.id === "common");
}

let isSpinning = false;
let autoRollTimer = null;

function triggerRoll() {
    if (isSpinning) return;
    // Do not roll if splash overlay is open
    const splashOpen = !document.getElementById("splash-overlay").classList.contains("hidden");
    if (splashOpen) return;

    isSpinning = true;

    sfx.init();
    sfx.playClick();

    const quickRoll = document.getElementById("quick-roll-toggle").checked;
    const duration = quickRoll ? 150 : 1100;

    // Show spinning status
    showStatus(TRANSLATIONS[currentLang].roll_status_spinning);
    document.getElementById("roll-btn").disabled = true;

    // Trigger stickman pre-jump animation
    jumpVelocity = 5.0; // Small hop on spin

    if (!quickRoll) {
        sfx.playSpin(duration / 1000);
        // Play rapid particle sparkles for rolling excitement
        let spinTicks = 0;
        const spinParticlesTimer = setInterval(() => {
            const canvasW = canvas.width / (window.devicePixelRatio || 1);
            const canvasH = canvas.height / (window.devicePixelRatio || 1);
            particles.push(new Particle(
                canvasW / 2 + (Math.random() * 30 - 15),
                canvasH * 0.68 - 40,
                `hsl(${Math.random() * 360}, 90%, 65%)`,
                {
                    vx: Math.random() * 6 - 3,
                    vy: Math.random() * -6 - 2,
                    size: Math.random() * 4 + 2,
                    decay: 0.04
                }
            ));
            spinTicks++;
            if (spinTicks > 12) clearInterval(spinParticlesTimer);
        }, 80);
    }

    setTimeout(() => {
        const rolled = rollAura();

        // Update Stats
        state.rolls++;

        // Add coins
        state.coins += rolled.coinBonus;

        // Add to unlocked list
        if (!state.unlockedAuras[rolled.id]) {
            state.unlockedAuras[rolled.id] = 0;
        }
        state.unlockedAuras[rolled.id]++;

        // Check achievements progression
        checkAchievements();

        // Play success audio
        sfx.playUnlock(rolled.id);

        // Auto equip if it is rarer than current, or if nothing is equipped
        const wasAlreadyEquipped = (state.equippedAura === rolled.id);
        let shouldEquip = false;
        if (!state.equippedAura) {
            shouldEquip = true;
        } else {
            const currentAuraObj = AURAS.find(a => a.id === state.equippedAura);
            // Higher chance value means rarer (e.g. 100 Legendary is rarer than 2 Common)
            if (currentAuraObj && rolled.chance > currentAuraObj.chance) {
                shouldEquip = true;
            }
        }

        if (shouldEquip) {
            state.equippedAura = rolled.id;
        }

        const skipCutscene = !!(state.settings?.auras?.[rolled.id]?.disableCutscene);
        const skipPopup = !!(state.settings?.auras?.[rolled.id]?.disablePopup);

        let animDuration = 0;
        if (rolled.id === "relaxed") {
            if (!wasAlreadyEquipped && !skipCutscene) {
                relaxedAnimationActive = true;
                relaxedAnimationTimer = Date.now();
                relaxedHasTriggered = false;
                animDuration = 4000;

                setTimeout(() => {
                    if (!skipPopup) showSplashOverlay(rolled);
                }, 4000);
            } else {
                animDuration = 800;
                if (!skipPopup) {
                    setTimeout(() => {
                        showSplashOverlay(rolled);
                    }, 800);
                }
            }
        } else if (rolled.id === "emerald") {
            if (!wasAlreadyEquipped && !skipCutscene) {
                emeraldAnimationActive = true;
                emeraldAnimationTimer = Date.now();
                emeraldHasTriggered = false;
                animDuration = 3500;

                setTimeout(() => {
                    if (!skipPopup) showSplashOverlay(rolled);
                }, 3500);
            } else {
                animDuration = 800;
                if (!skipPopup) {
                    setTimeout(() => {
                        showSplashOverlay(rolled);
                    }, 800);
                }
            }
        } else if (rolled.id === "legendary") {
            if (!wasAlreadyEquipped && !skipCutscene) {
                legendaryAnimationActive = true;
                legendaryAnimationTimer = Date.now();
                legendaryHasShaken = false;
                animDuration = 3000;

                setTimeout(() => {
                    if (!skipPopup) showSplashOverlay(rolled);
                }, 2200);
            } else {
                animDuration = 800;
                if (!skipPopup) {
                    setTimeout(() => {
                        showSplashOverlay(rolled);
                    }, 800);
                }
            }
        } else if (rolled.id === "nature") {
            if (!wasAlreadyEquipped && !skipCutscene) {
                natureAnimationActive = true;
                natureAnimationTimer = Date.now();
                natureHasTriggered = false;
                animDuration = 4000;

                setTimeout(() => {
                    if (!skipPopup) showSplashOverlay(rolled);
                }, 4000);
            } else {
                animDuration = 800;
                if (!skipPopup) {
                    setTimeout(() => {
                        showSplashOverlay(rolled);
                    }, 800);
                }
            }
        } else if (rolled.id === "glitch") {
            if (!wasAlreadyEquipped && !skipCutscene) {
                glitchAnimationActive = true;
                glitchAnimationTimer = Date.now();
                glitchHasTriggered = false;
                animDuration = 5000;

                document.body.classList.add("glitch-cutscene-active");

                setTimeout(() => {
                    document.body.classList.remove("glitch-cutscene-active");
                    if (!skipPopup) showSplashOverlay(rolled);
                }, 5000);
            } else {
                animDuration = 800;
                if (!skipPopup) {
                    setTimeout(() => {
                        showSplashOverlay(rolled);
                    }, 800);
                }
            }
        } else if (rolled.id === "malware") {
            if (!wasAlreadyEquipped && !skipCutscene) {
                malwareAnimationActive = true;
                malwareAnimationTimer = Date.now();
                malwareHasTriggered = false;
                animDuration = 4500;

                document.body.classList.add("malware-cutscene-active");

                setTimeout(() => {
                    document.body.classList.remove("malware-cutscene-active");
                    if (!skipPopup) showSplashOverlay(rolled);
                }, 4500);
            } else {
                animDuration = 800;
                if (!skipPopup) {
                    setTimeout(() => {
                        showSplashOverlay(rolled);
                    }, 800);
                }
            }
        } else if (rolled.id === "demon") {
            if (!wasAlreadyEquipped && !skipCutscene) {
                demonAnimationActive = true;
                demonAnimationTimer = Date.now();
                demonHasTriggered = false;
                animDuration = 4500;

                document.body.classList.add("demon-cutscene-active");

                setTimeout(() => {
                    document.body.classList.remove("demon-cutscene-active");
                    if (!skipPopup) showSplashOverlay(rolled);
                }, 4500);
            } else {
                animDuration = 800;
                if (!skipPopup) {
                    setTimeout(() => {
                        showSplashOverlay(rolled);
                    }, 800);
                }
            }
        } else if (rolled.id === "angel") {
            if (!wasAlreadyEquipped && !skipCutscene) {
                angelAnimationActive = true;
                angelAnimationTimer = Date.now();
                angelHasTriggered = false;
                animDuration = 5500;

                document.body.classList.add("angel-cutscene-active");

                setTimeout(() => {
                    document.body.classList.remove("angel-cutscene-active");
                    if (!skipPopup) showSplashOverlay(rolled);
                }, 5500);
            } else {
                animDuration = 800;
                if (!skipPopup) {
                    setTimeout(() => {
                        showSplashOverlay(rolled);
                    }, 800);
                }
            }
        } else if (rolled.id === "earth") {
            if (!wasAlreadyEquipped && !skipCutscene) {
                earthAnimationActive = true;
                earthAnimationTimer = Date.now();
                earthHasTriggered = false;
                animDuration = 6000;

                document.body.classList.add("earth-cutscene-active");

                setTimeout(() => {
                    document.body.classList.remove("earth-cutscene-active");
                    if (!skipPopup) showSplashOverlay(rolled);
                }, 6000);
            } else {
                animDuration = 800;
                if (!skipPopup) {
                    setTimeout(() => {
                        showSplashOverlay(rolled);
                    }, 800);
                }
            }
        } else if (rolled.chance >= 32) {
            triggerShake(12);
        }

        // Save
        saveState();

        // UI Refresh
        updateUI();
        renderAuraList();

        // Cooldown delay
        const cooldown = getRollSpeed();
        showStatus(TRANSLATIONS[currentLang].roll_status_cooldown);

        const finalDelay = Math.max(cooldown, animDuration);

        setTimeout(() => {
            isSpinning = false;

            const splashOpen = !document.getElementById("splash-overlay").classList.contains("hidden");
            if (!splashOpen) {
                document.getElementById("roll-btn").disabled = false;
                showStatus(TRANSLATIONS[currentLang].roll_status_ready);

                // Check Auto Roll
                if (document.getElementById("auto-roll-toggle").checked) {
                    triggerRoll();
                }
            }
        }, finalDelay);

    }, duration);
}


// ==========================================================================
// 8. SHOP & PROGRESSION ACTIONS
// ==========================================================================

function getUpgradePrice(type, level) {
    if (type === "luck") {
        return Math.round(8 * Math.pow(1.3, level - 1));
    } else if (type === "speed") {
        return Math.round(10 * Math.pow(1.3, level - 1));
    }
    return 9999;
}

function buyUpgrade(type) {
    sfx.playClick();
    const currentLvl = state.upgrades[type];
    if (currentLvl >= 25) return;

    const price = getUpgradePrice(type, currentLvl);
    if (state.coins >= price) {
        state.coins -= price;
        state.upgrades[type]++;
        saveState();
        updateUI();

        // Trigger shop purchase sparkles
        const btn = document.getElementById(type === "luck" ? "buy-luck-btn" : "buy-speed-btn");
        const rect = btn.getBoundingClientRect();
        const canvasRect = canvas.getBoundingClientRect();
        const sparkX = rect.left - canvasRect.left + rect.width / 2;
        const sparkY = rect.top - canvasRect.top + rect.height / 2;
        for (let i = 0; i < 15; i++) {
            particles.push(new Particle(
                sparkX, sparkY,
                "#a855f7",
                {
                    vx: Math.random() * 4 - 2,
                    vy: Math.random() * 4 - 2,
                    size: Math.random() * 3 + 2,
                    decay: 0.03
                }
            ));
        }
    }
}

function buyPotionLuck() {
    sfx.playClick();
    const price = 50;
    if (state.coins >= price) {
        state.coins -= price;
        // Stack potion time
        state.potionLuckTime += 60;
        saveState();
        updateUI();
    }
}

// Buy and Equip Cosmetics
function handleCosmeticClick(type, item) {
    sfx.playClick();
    const unlockedList = type === "platform" ? state.cosmetics.unlockedPlatforms : state.cosmetics.unlockedCharacters;
    const equippedKey = type === "platform" ? "equippedPlatform" : "equippedCharacter";

    if (unlockedList.includes(item.id)) {
        // Equip
        state.cosmetics[equippedKey] = item.id;
        saveState();
        renderCosmetics();
    } else {
        // Buy
        if (state.coins >= item.cost) {
            state.coins -= item.cost;
            unlockedList.push(item.id);
            state.cosmetics[equippedKey] = item.id;
            saveState();
            updateUI();
            renderCosmetics();
        }
    }
}


// ==========================================================================
// 9. UI UPDATE LOGIC
// ==========================================================================

function updateUI() {
    const t = TRANSLATIONS[currentLang];

    // Core stats
    document.getElementById("total-rolls").textContent = state.rolls;
    document.getElementById("coin-balance").textContent = Math.floor(state.coins);

    const luck = getLuckMultiplier();
    document.getElementById("luck-multiplier").textContent = `x${luck.toFixed(2)}`;

    // Shop Upgrades
    // Luck
    const luckLvl = state.upgrades.luck;
    document.getElementById("luck-lvl").textContent = luckLvl >= 25 ? t.max_level : `Lvl ${luckLvl}`;
    const luckPrice = getUpgradePrice("luck", luckLvl);
    document.getElementById("luck-price").textContent = luckLvl >= 25 ? "—" : luckPrice;
    document.getElementById("buy-luck-btn").disabled = (luckLvl >= 25 || state.coins < luckPrice);

    // Speed
    const speedLvl = state.upgrades.speed;
    document.getElementById("speed-lvl").textContent = speedLvl >= 25 ? t.max_level : `Lvl ${speedLvl}`;
    const speedPrice = getUpgradePrice("speed", speedLvl);
    document.getElementById("speed-price").textContent = speedLvl >= 25 ? "—" : speedPrice;
    document.getElementById("buy-speed-btn").disabled = (speedLvl >= 25 || state.coins < speedPrice);

    // Potion Luck
    document.getElementById("buy-potion-luck-btn").disabled = (state.coins < 50);
    const potionTimerEl = document.getElementById("potion-timer-luck");
    const potionSecEl = document.getElementById("potion-sec-luck");
    if (state.potionLuckTime > 0) {
        potionTimerEl.classList.remove("hidden");
        potionSecEl.textContent = state.potionLuckTime;
    } else {
        potionTimerEl.classList.add("hidden");
    }

    // Equipped Aura label floating
    const labelDisplay = document.getElementById("equipped-aura-display");
    if (state.equippedAura) {
        const auraObj = AURAS.find(a => a.id === state.equippedAura);
        if (auraObj) {
            // Hide legendary text until hands go up
            if (auraObj.id === "legendary" && legendaryAnimationActive && (Date.now() - legendaryAnimationTimer < 1000)) {
                labelDisplay.textContent = "";
                labelDisplay.className = "equipped-aura-label aura-c-none";
            } else if (auraObj.id === "emerald" && emeraldAnimationActive && (Date.now() - emeraldAnimationTimer < 2200)) {
                // Hide emerald text until gem arrives and bursts
                labelDisplay.textContent = "";
                labelDisplay.className = "equipped-aura-label aura-c-none";
            } else if (auraObj.id === "relaxed" && relaxedAnimationActive && (Date.now() - relaxedAnimationTimer < 2800)) {
                // Hide relaxed text until yawn and float/tilt sequences finish
                labelDisplay.textContent = "";
                labelDisplay.className = "equipped-aura-label aura-c-none";
            } else if (auraObj.id === "malware" && malwareAnimationActive && (Date.now() - malwareAnimationTimer < 3500)) {
                // Hide malware text until core explosion at 3500ms
                labelDisplay.textContent = "";
                labelDisplay.className = "equipped-aura-label aura-c-none";
            } else if (auraObj.id === "angel" && angelAnimationActive && (Date.now() - angelAnimationTimer < 3000)) {
                // Hide angel text until descent phase starts at 3000ms
                labelDisplay.textContent = "";
                labelDisplay.className = "equipped-aura-label aura-c-none";
            } else if (auraObj.id === "earth" && earthAnimationActive && (Date.now() - earthAnimationTimer < 5400)) {
                // Hide earth text until final stone assembly and splash at 5400ms
                labelDisplay.textContent = "";
                labelDisplay.className = "equipped-aura-label aura-c-none";
            } else {
                labelDisplay.textContent = auraObj.name[currentLang];
                // Clear current aura classes and add new
                labelDisplay.className = "equipped-aura-label";
                labelDisplay.classList.add(`aura-c-${auraObj.id}`);
            }
        }
    } else {
        labelDisplay.textContent = t.no_aura_equipped;
        labelDisplay.className = "equipped-aura-label aura-c-none";
    }

    // Aura Book progress
    const totalAurasCount = AURAS.length;
    const unlockedAurasCount = AURAS.filter(a => state.unlockedAuras[a.id] > 0).length;
    document.getElementById("collection-progress").textContent = `${unlockedAurasCount} / ${totalAurasCount}`;
    const progressPercent = (unlockedAurasCount / totalAurasCount) * 100;
    document.getElementById("collection-progress-bar").style.width = `${progressPercent}%`;
}

// Show helper message/status
function showStatus(text) {
    document.getElementById("roll-status").textContent = text;
}

// Render Aura collection book list
function renderAuraList() {
    const listEl = document.getElementById("aura-collection-list");
    listEl.innerHTML = "";

    const t = TRANSLATIONS[currentLang];

    // Render from rarest to commonest
    const sortedAuras = [...AURAS].sort((a, b) => b.chance - a.chance);

    sortedAuras.forEach(aura => {
        const unlockedCount = state.unlockedAuras[aura.id] || 0;
        const isLocked = unlockedCount === 0;
        const isEquipped = state.equippedAura === aura.id;

        const row = document.createElement("div");
        row.className = `aura-row ${isLocked ? 'locked' : ''} ${isEquipped ? 'equipped' : ''}`;

        // Aura name and chance string
        const nameText = isLocked ? "???" : aura.name[currentLang];
        const chanceStr = t.rarity_chance.replace("{chance}", aura.chance);

        row.innerHTML = `
            <div class="aura-row-left">
                <div class="aura-dot" style="color: ${aura.color}; background-color: ${aura.color}"></div>
                <div class="aura-meta">
                    <span class="aura-name">${nameText}</span>
                    <span class="aura-chance">${chanceStr}</span>
                </div>
            </div>
            ${!isLocked ? `<span class="aura-count">x${unlockedCount}</span>` : `<i class="fa-solid fa-lock" style="font-size: 11px; color: var(--text-muted)"></i>`}
        `;

        // Hover details
        if (!isLocked) {
            row.title = aura.desc[currentLang] + `\nБонус монет: +${aura.coinBonus}`;
            row.addEventListener("click", () => {
                sfx.playClick();
                // Equip/Unequip
                if (state.equippedAura === aura.id) {
                    state.equippedAura = null;
                } else {
                    state.equippedAura = aura.id;
                }
                saveState();
                updateUI();
                renderAuraList();
            });
        } else {
            row.title = t.locked;
        }

        listEl.appendChild(row);
    });
}

// Render Platform & Character Skin grids
function renderCosmetics() {
    const t = TRANSLATIONS[currentLang];

    // Platforms Grid
    const platGrid = document.getElementById("platforms-grid");
    platGrid.innerHTML = "";
    PLATFORMS.forEach(item => {
        const cell = document.createElement("div");
        const isUnlocked = state.cosmetics.unlockedPlatforms.includes(item.id);
        const isEquipped = state.cosmetics.equippedPlatform === item.id;

        cell.className = `cosmetic-cell ${isEquipped ? 'equipped' : ''} ${!isUnlocked ? 'locked' : ''}`;

        // Platform icon - hexagonal box or layer icon
        let iconHtml = `<i class="fa-solid fa-layer-group cosmetic-icon" style="color: ${item.color}"></i>`;

        cell.innerHTML = `
            ${iconHtml}
            <span class="cosmetic-name">${t[item.nameKey]}</span>
            ${!isUnlocked ? `<div class="cosmetic-price-tooltip"><i class="fa-solid fa-coins"></i> ${item.cost}</div>` : ''}
        `;

        // Tooltip detail
        cell.title = isEquipped ? t.equipped : (isUnlocked ? t.equip : `${t.buy}: ${item.cost}`);

        cell.addEventListener("click", () => handleCosmeticClick("platform", item));
        platGrid.appendChild(cell);
    });

    // Characters Grid
    const charGrid = document.getElementById("characters-grid");
    charGrid.innerHTML = "";
    CHARACTERS.forEach(item => {
        if (item.id === "mellstroy" && !state.cosmetics.unlockedCharacters.includes("mellstroy")) {
            return;
        }
        const cell = document.createElement("div");
        const isUnlocked = state.cosmetics.unlockedCharacters.includes(item.id);
        const isEquipped = state.cosmetics.equippedCharacter === item.id;

        cell.className = `cosmetic-cell ${isEquipped ? 'equipped' : ''} ${!isUnlocked ? 'locked' : ''}`;

        // Character icon - user shape or crown, knight helmet icon
        let iconClass = "fa-user";
        if (item.style === "king") iconClass = "fa-crown";
        else if (item.style === "knight") iconClass = "fa-shield-halved";
        else if (item.style === "shadow") iconClass = "fa-ghost";
        else if (item.id === "mellstroy") iconClass = "fa-masks-theater";

        let iconHtml = `<i class="fa-solid ${iconClass} cosmetic-icon" style="color: ${item.color}"></i>`;

        cell.innerHTML = `
            ${iconHtml}
            <span class="cosmetic-name">${t[item.nameKey]}</span>
            ${!isUnlocked ? `<div class="cosmetic-price-tooltip"><i class="fa-solid fa-coins"></i> ${item.cost}</div>` : ''}
        `;

        cell.title = isEquipped ? t.equipped : (isUnlocked ? t.equip : `${t.buy}: ${item.cost}`);

        cell.addEventListener("click", () => handleCosmeticClick("character", item));
        charGrid.appendChild(cell);
    });
}

// Show roll splash popup (for rarer aura rolls)
function showSplashOverlay(aura) {
    const overlay = document.getElementById("splash-overlay");
    const nameEl = document.getElementById("splash-aura-name");
    const rarityEl = document.getElementById("splash-aura-rarity");

    const t = TRANSLATIONS[currentLang];

    nameEl.textContent = aura.name[currentLang].toUpperCase();
    nameEl.style.color = aura.color;

    const chanceStr = t.rarity_chance.replace("{chance}", aura.chance);
    rarityEl.textContent = chanceStr;

    overlay.classList.remove("hidden");
    document.getElementById("roll-btn").disabled = true;
}

function hideSplashOverlay() {
    sfx.playClick();
    document.getElementById("splash-overlay").classList.add("hidden");
    document.getElementById("roll-btn").disabled = false;
    showStatus(TRANSLATIONS[currentLang].roll_status_ready);

    // Resume auto roll if checked and not spinning
    if (document.getElementById("auto-roll-toggle").checked && !isSpinning) {
        triggerRoll();
    }
}


// ==========================================================================
// 10. POTION COUNTDOWN TICKER
// ==========================================================================
setInterval(() => {
    if (state.potionLuckTime > 0) {
        state.potionLuckTime--;
        saveState();
        updateUI();
        if (state.potionLuckTime === 0) {
            showStatus(TRANSLATIONS[currentLang].roll_status_ready);
        }
    }
}, 1000);


// ==========================================================================
// 11. INITIALIZATION & BINDINGS
// ==========================================================================

// Load saved data and set language
loadState();
setLanguage(currentLang);

// Start Animation loop
requestAnimationFrame(animate);

// Event Bindings
document.getElementById("roll-btn").addEventListener("click", triggerRoll);
document.getElementById("splash-close-btn").addEventListener("click", hideSplashOverlay);

// Auto-roll check listener
document.getElementById("auto-roll-toggle").addEventListener("change", (e) => {
    sfx.playClick();
    if (e.target.checked && !isSpinning) {
        triggerRoll();
    }
});

// Sound button toggle
const audioBtn = document.getElementById("audio-toggle-btn");
function updateAudioButtonIcon() {
    if (sfx.muted) {
        audioBtn.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
        audioBtn.classList.add("muted");
    } else {
        audioBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
        audioBtn.classList.remove("muted");
    }
}
updateAudioButtonIcon();

audioBtn.addEventListener("click", () => {
    sfx.toggleMute();
    sfx.playClick();
    updateAudioButtonIcon();
});

// Language button toggle
document.getElementById("lang-toggle-btn").addEventListener("click", () => {
    sfx.playClick();
    setLanguage(currentLang === "ru" ? "en" : "ru");
});

// Tab Switching Bindings
document.getElementById("tab-collection").addEventListener("click", () => {
    sfx.playClick();
    document.getElementById("tab-collection").classList.add("active");
    document.getElementById("tab-achievements").classList.remove("active");
    document.getElementById("collection-tab-content").classList.remove("hidden");
    document.getElementById("achievements-tab-content").classList.add("hidden");
});

document.getElementById("tab-achievements").addEventListener("click", () => {
    sfx.playClick();
    document.getElementById("tab-achievements").classList.add("active");
    document.getElementById("tab-collection").classList.remove("active");
    document.getElementById("achievements-tab-content").classList.remove("hidden");
    document.getElementById("collection-tab-content").classList.add("hidden");
    renderAchievements();
});

// Shop purchases bindings
document.getElementById("buy-luck-btn").addEventListener("click", () => buyUpgrade("luck"));
document.getElementById("buy-speed-btn").addEventListener("click", () => buyUpgrade("speed"));
document.getElementById("buy-potion-luck-btn").addEventListener("click", buyPotionLuck);

// Reset confirmation flow
const resetModal = document.getElementById("reset-confirm-modal");
document.getElementById("reset-btn").addEventListener("click", () => {
    sfx.playClick();
    resetModal.classList.remove("hidden");
});
document.getElementById("reset-cancel-btn").addEventListener("click", () => {
    sfx.playClick();
    resetModal.classList.add("hidden");
});
document.getElementById("reset-confirm-btn").addEventListener("click", () => {
    sfx.playClick();
    resetModal.classList.add("hidden");
    resetProgress();
});

// ==========================================================================
// 12. SETTINGS PANEL BINDINGS & LOGIC
// ==========================================================================
const settingsModal = document.getElementById("settings-modal");
const settingsBtn = document.getElementById("settings-btn");
const settingsCloseBtn = document.getElementById("settings-close-btn");
const generalTabBtn = document.getElementById("settings-tab-general");
const aurasTabBtn = document.getElementById("settings-tab-auras");
const generalContent = document.getElementById("settings-general-content");
const aurasContent = document.getElementById("settings-auras-content");

const soundToggle = document.getElementById("settings-sound-toggle");
const effectsToggle = document.getElementById("settings-effects-toggle");

function openSettingsModal() {
    sfx.playClick();

    // Sync toggles with state
    soundToggle.checked = state.settings.soundEnabled;
    effectsToggle.checked = state.settings.effectsEnabled;

    renderSettingsAuras();
    settingsModal.classList.remove("hidden");
}

function closeSettingsModal() {
    sfx.playClick();
    settingsModal.classList.add("hidden");
}

settingsBtn.addEventListener("click", openSettingsModal);
settingsCloseBtn.addEventListener("click", closeSettingsModal);

generalTabBtn.addEventListener("click", () => {
    sfx.playClick();
    generalTabBtn.classList.add("active");
    aurasTabBtn.classList.remove("active");
    generalContent.classList.remove("hidden");
    aurasContent.classList.add("hidden");
});

aurasTabBtn.addEventListener("click", () => {
    sfx.playClick();
    aurasTabBtn.classList.add("active");
    generalTabBtn.classList.remove("active");
    aurasContent.classList.remove("hidden");
    generalContent.classList.add("hidden");
    renderSettingsAuras();
});

soundToggle.addEventListener("change", (e) => {
    state.settings.soundEnabled = e.target.checked;
    sfx.muted = !e.target.checked;
    localStorage.setItem("auraroll_muted", sfx.muted);
    saveState();
    updateAudioButtonIcon();
});

effectsToggle.addEventListener("change", (e) => {
    state.settings.effectsEnabled = e.target.checked;
    saveState();
});

function renderSettingsAuras() {
    const listEl = document.getElementById("settings-auras-list");
    if (!listEl) return;
    listEl.innerHTML = "";

    // Wind is chance: 32. Sort from rarest (Angel = 7500) to commonest (Wind = 32)
    const sortedAuras = AURAS.filter(a => a.chance >= 32).sort((a, b) => b.chance - a.chance);

    sortedAuras.forEach(aura => {
        if (!state.settings.auras[aura.id]) {
            state.settings.auras[aura.id] = { disablePopup: false, disableCutscene: false };
        }
        const auraSet = state.settings.auras[aura.id];
        const hasCutscene = (aura.id !== "wind" && aura.id !== "water");

        const row = document.createElement("div");
        row.className = "aura-settings-row";

        row.innerHTML = `
            <div class="aura-settings-left">
                <div class="aura-dot" style="color: ${aura.color}; background-color: ${aura.color}"></div>
                <span class="aura-name" style="color: ${aura.color}; font-weight: bold;">${aura.name[currentLang]}</span>
            </div>
            <div class="aura-settings-right">
                ${hasCutscene ? `
                <div class="aura-toggle-item">
                    <span class="aura-toggle-label">${currentLang === 'ru' ? 'Без катсцены' : 'No Cutscene'}</span>
                    <label class="switch">
                        <input type="checkbox" class="aura-cutscene-toggle" data-aura-id="${aura.id}" ${auraSet.disableCutscene ? 'checked' : ''}>
                        <span class="slider round"></span>
                    </label>
                </div>
                ` : ''}
                <div class="aura-toggle-item">
                    <span class="aura-toggle-label">${currentLang === 'ru' ? 'Без окон' : 'No Popup'}</span>
                    <label class="switch">
                        <input type="checkbox" class="aura-popup-toggle" data-aura-id="${aura.id}" ${auraSet.disablePopup ? 'checked' : ''}>
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>
        `;

        // Event Listeners for checkboxes
        const cutsceneToggle = row.querySelector(".aura-cutscene-toggle");
        if (cutsceneToggle) {
            cutsceneToggle.addEventListener("change", (e) => {
                state.settings.auras[aura.id].disableCutscene = e.target.checked;
                saveState();
            });
        }

        row.querySelector(".aura-popup-toggle").addEventListener("change", (e) => {
            state.settings.auras[aura.id].disablePopup = e.target.checked;
            saveState();
        });

        listEl.appendChild(row);
    });
}
