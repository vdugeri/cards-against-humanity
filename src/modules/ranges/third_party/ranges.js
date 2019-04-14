// Google Sheets Ranges
// Object(Key: Pack ID, Value: [WORKSHEET_INDEX, WHITE, BLACK])
const RANGES = {
  'bad_hombres_against_fake_news_pack_1': [17, 'B36:B125', 'B5:C34'],
  'blurbs_against_buffalo': [17, 'B151:B204', 'B132:C149'],
  'cards_about_toronto': [17, 'B605:B802', 'B564:C603'],
  'cards_with_no_sexuality': [17, 'B975:B1049', 'B949:C973'],
  'charlie_foxtrot': [17, 'B1508:B1712', 'B1442:C1506'],
  'crazy_horrible_rabbit_vol_1': [17, 'B2508:B2587', 'B2475:C2506'],
  'pigs_against_profanity': [17, 'B3732:B3811', 'B3700:C3730'],

  'cakes_athirst_hilarity_vol_1': [17, 'B242:B321', 'B211:C240'],
  'cakes_athirst_hilarity_vol_2': [17, 'I242:I321', 'I211:J240'],
  'cakes_athirst_hilarity_vol_3': [17, 'Q242:Q321', 'Q211:R240'],
  'cakes_athirst_hilarity_vol_4': [17, 'W242:W321', 'W211:X240'],

  'carbs_huge_manatee_general_expansion_1': [17, 'B351:B442', 'B328:C349'],
  'carbs_huge_manatee_kink_expansion_1': [17, 'I351:I442', 'I328:J349'],
  'carbs_huge_manatee_online_dating_expansion_1': [17, 'Q351:Q443', 'Q328:R349'],
  'carbs_huge_manatee_general_expansion_2': [17, 'W347:W436', 'W328:X345'],
  'carbs_huge_manatee_general_expansion_3': [17, 'B468:B557', 'B449:C466'],
  'carbs_huge_manatee_dance_expansion_1': [17, 'I468:I557', 'I449:J466'],

  'cards_and_punishment_vol_1': [17, 'B849:B942', 'B809:C847'],
  'cards_and_punishment_vol_2': [17, 'I843:I919', 'I809:J841'],

  'carps_angsty_manatee_vol_1': [17, 'B1077:B1206', 'B1056:C1075'],
  'carps_angsty_manatee_vol_2': [17, 'I1079:I1204', 'I1056:J1077'],
  'carps_angsty_manatee_texas_ed': [17, 'Q1082:Q1205', 'Q1056:R1080'],

  'cats_abiding_horribly_ep1': [17, 'B1279:B1418', 'B1213:C1277'],
  'cats_abiding_horribly_ep2': [17, 'I1254:I1363', 'I1213:J1252'],
  'cats_abiding_horribly_ep3': [17, 'Q1254:Q1363', 'Q1213:R1252'],
  'cats_abiding_horribly_bonus': [17, 'W1219:W1223', 'W1213:X1217'],
  'cats_abiding_horribly_bonus2': [17, 'B1431:B1435', 'B1425:C1429'],

  'clones_attack_hilarity_1': [17, 'B1758:B1869', 'B1719:C1756'],
  'clones_attack_hilarity_2': [17, 'I1760:I1869', 'I1719:J1758'],

  'cocks_abreast_hostility_cock_pack_one': [17, 'B1902:B2001', 'B1876:C1900'],
  'cocks_abreast_hostility_cock_pack_two': [17, 'I1902:I2001', 'I1876:J1900'],

  'cols_despite_kentucky': [17, 'B2008:B2025', null],
  'cols_despite_kentucky_2': [17, 'I2018:I2044', 'I2008:J2016'],

  'cows_against_hamburgers_patty_pack_1': [17, 'B2082:B2161', 'B2051:C2080'],
  'cows_grilling_hamburgers_patty_pack_1': [17, 'I2094:I2218', 'I2051:J2092'],

  'crabs_adjust_humidity_vol_1': [17, 'B2258:B2344', 'B2224:C2256'],
  'crabs_adjust_humidity_vol_2': [17, 'I2258:I2350', 'I2224:J2256'],
  'crabs_adjust_humidity_vol_3': [17, 'Q2259:Q2341', 'Q2224:R2257'],
  'crabs_adjust_humidity_vol_4': [17, 'W2257:W2337', 'W2224:X2255'],
  'crabs_adjust_humidity_vol_5': [17, 'B2389:B2468', 'B2356:C2387'],
  'crabs_adjust_humidity_vol_6': [17, 'I2389:I2468', 'I2356:J2387'],
  'crabs_adjust_humidity_vol_7': [17, 'Q2389:Q2468', 'Q2356:R2387'],

  'crows_adopt_vulgarity_vol_1': [17, 'B2625:B2704', 'B2594:C2623'],
  'crows_adopt_vulgarity_vol_2': [17, 'I2625:I2704', 'I2594:J2623'],
  'crows_adopt_vulgarity_vol_3': [17, 'Q2625:Q2704', 'Q2594:R2623'],
  'crows_adopt_vulgarity_vol_4': [17, 'W2625:W2704', 'W2594:X2623'],

  'guards_against_insanity_ed_1': [17, 'B2744:B2823', 'B2711:C2742'],
  'guards_against_insanity_ed_2': [17, 'I2734:I2823', 'I2711:J2732'],
  'guards_against_insanity_ed_3': [17, 'Q2734:Q2823', 'Q2711:R2732'],
  'guards_against_insanity_ed_4': [17, 'W2734:W2823', 'W2711:X2732'],
  'guards_against_insanity_ed_5': [17, 'B2853:B2942', 'B2830:C2851'],

  'jadedaid_card_game_save_humanitarians': [17, 'B2985:B3143', 'B2949:C2983'],
  'jadedaid_peace_corps_expansion_pack': [17, 'I2960:I3005', 'I2949:J2958'],

  'kinderperfect_timeout_for_parents': [17, 'B3173:B3344', 'B3150:C3171'],
  'kinderperfect_commercial_set': [17, 'I3221:I3544', 'I3150:J3219'],
  'kinderperfect_more_expansion_pack': [17, 'Q3176:Q3250', 'Q3150:R3174'],
  'kinderperfect_naughty_expansions_pack': [17, 'W3176:W3250', 'W3150:X3174'],
  'kinderperfect_tween_expansion_pack': [17, 'B3576:B3650', 'B3551:C3574'],

  'knitters_against_swatches_first_ed': [17, 'B3664:B3693', 'B3657:C3662'],
  'knitters_against_swatches_second_ed': [17, 'I3666:I3693', 'I3657:J3664'],

  'voters_choice_first_expansion': [17, 'B3827:B3846', 'B3818:C3825'],
  'voters_choice_second_expansion': [17, 'I3834:I3853', 'I3818:J3832'],
  'voters_choice_third_expansion': [17, 'Q3830:Q3851', 'Q3818:R3828'],
  'voters_choice_fourth_expansion': [17, 'W3831:W3852', 'W3818:X3829'],

  'words_against_morality_vol_1': [17, 'B3891:B3970', 'B3860:C3889'],
  'words_against_morality_vol_2': [17, 'I3891:I3970', 'I3860:J3889'],
  'words_against_morality_vol_3': [17, 'Q3891:Q3970', 'Q3860:R3889'],
  'words_against_morality_vol_4': [17, 'W3891:W3970', 'W3860:X3889'],

  'worst_card_game_colorado_ed': [17, 'B4014:B4085', 'B3977:C4012'],
  'worst_card_game_2016_national_ed': [17, 'I3996:I4084', 'I3977:J3994']
}

// Pack Names
// Object(Key: Pack ID, Value: Pack Name)
const PACKNAMES = {
  'bad_hombres_against_fake_news_pack_1': 'Bad Hombres Against Fake News 1',
  'blurbs_against_buffalo': 'Blurbs Against Buffalo',
  'cards_about_toronto': 'Cards About Toronto',
  'cards_with_no_sexuality': 'Cards With No Sexuality',
  'charlie_foxtrot': 'Charlie Foxtrot',
  'crazy_horrible_rabbit_vol_1': 'Crazy & Horrible Rabbit - Vol. 1',
  'pigs_against_profanity': 'Pigs Against Profanity',

  'cakes_athirst_hilarity_vol_1': 'Cakes Athirst Hilarity Volume 1',
  'cakes_athirst_hilarity_vol_2': 'Cakes Athirst Hilarity Volume 2',
  'cakes_athirst_hilarity_vol_3': 'Cakes Athirst Hilarity Volume 3',
  'cakes_athirst_hilarity_vol_4': 'Cakes Athirst Hilarity Volume 4',

  'carbs_huge_manatee_general_expansion_1': 'Carbs of the Huge Manatee: General Expansion 1',
  'carbs_huge_manatee_kink_expansion_1': 'Carbs of the Huge Manatee - Kink Expansion 1',
  'carbs_huge_manatee_online_dating_expansion_1': 'Carbs of the Huge Manatee - Online Dating Expansion 1',
  'carbs_huge_manatee_general_expansion_2': 'Carbs of the Huge Manatee: General Expansion 2',
  'carbs_huge_manatee_general_expansion_3': 'Carbs of the Huge Manatee: General Expansion 3',
  'carbs_huge_manatee_dance_expansion_1': 'Carbs of the Huge Manatee: Dance Expansion 1',

  'cards_and_punishment_vol_1': 'Cards and Punishment Vol. One',
  'cards_and_punishment_vol_2': 'Cards and Punishment Vol. Two',

  'carps_angsty_manatee_vol_1': 'Carps & Angsty Manatee - Volume 1',
  'carps_angsty_manatee_vol_2': 'Carps & Angsty Manatee - Volume 2',
  'carps_angsty_manatee_texas_ed': 'Carps & Angsty Manatee - Texas Edition',

  'cats_abiding_horribly_ep1': 'Cats Abiding Horribly: Episode I - The Dirty Goblin',
  'cats_abiding_horribly_ep2': 'Cats Abiding Horribly: Episode II - A New Low',
  'cats_abiding_horribly_ep3': 'Cats Abiding Horribly: Episode III - The SJWs Strike Back',
  'cats_abiding_horribly_bonus': 'Cats Abiding Horribly Bonus Cards',
  'cats_abiding_horribly_bonus2': 'Cats Abiding Horribly Bonus Cards 2',

  'clones_attack_hilarity_1': 'Clones Attack Hilarity #1',
  'clones_attack_hilarity_2': 'Clones Attack Hilarity #2',

  'cocks_abreast_hostility_cock_pack_one': 'Cocks Abreast Hostility: Cock Pack One: Just The Tip',
  'cocks_abreast_hostility_cock_pack_two': 'Cocks Abreast Hostility: Cock Pack Two: Fowls Deep',

  'cols_despite_kentucky': 'Cols Despite Kentucky',
  'cols_despite_kentucky_2': 'Cols Despite Kentucky 2',

  'cows_against_hamburgers_patty_pack_1': 'Cows Against Hamburgers - Patty Pack #1',
  'cows_grilling_hamburgers_patty_pack_1': 'Cows Grilling Hamburgers - Patty Pack #1',

  'crabs_adjust_humidity_vol_1': 'Crabs Adjust Humidity: Volume 1',
  'crabs_adjust_humidity_vol_2': 'Crabs Adjust Humidity: Volume 2',
  'crabs_adjust_humidity_vol_3': 'Crabs Adjust Humidity: Volume 3',
  'crabs_adjust_humidity_vol_4': 'Crabs Adjust Humidity: Volume 4',
  'crabs_adjust_humidity_vol_5': 'Crabs Adjust Humidity: Volume 5',
  'crabs_adjust_humidity_vol_6': 'Crabs Adjust Humidity: Volume 6',
  'crabs_adjust_humidity_vol_7': 'Crabs Adjust Humidity: Volume 7',

  'crows_adopt_vulgarity_vol_1': 'Crows Adopt Vulgarity, Vol. 1',
  'crows_adopt_vulgarity_vol_2': 'Crows Adopt Vulgarity, Vol. 2',
  'crows_adopt_vulgarity_vol_3': 'Crows Adopt Vulgarity, Vol. 3',
  'crows_adopt_vulgarity_vol_4': 'Crows Adopt Vulgarity, Vol. 4',

  'guards_against_insanity_ed_1': 'Guards Against Insanity, Edition 1',
  'guards_against_insanity_ed_2': 'Guards Against Insanity, Edition 2',
  'guards_against_insanity_ed_3': 'Guards Against Insanity, Edition 3',
  'guards_against_insanity_ed_4': 'Guards Against Insanity, Edition 4',
  'guards_against_insanity_ed_5': 'Guards Against Insanity, Edition 5',

  'jadedaid_card_game_save_humanitarians': 'JadedAid: A Card Game to Save Humanitarians',
  'jadedaid_peace_corps_expansion_pack': 'JadedAid: Peace Corps Expansion Pack',

  'kinderperfect_timeout_for_parents': 'KinderPerfect: A Timeout For Parents (Kickstarter Set)',
  'kinderperfect_commercial_set': 'KinderPerfect (Commercial Set)',
  'kinderperfect_more_expansion_pack': 'KinderPerfect: More Expansion Pack',
  'kinderperfect_naughty_expansions_pack': 'KinderPerfect: Naughty Expansion Pack',
  'kinderperfect_tween_expansion_pack': 'KinderPerfect: Tween Expansion Pack',

  'knitters_against_swatches_first_ed': 'Knitters Against Swatches First Edition',
  'knitters_against_swatches_second_ed': 'Knitters Against Swatches Second Edition',

  'voters_choice_first_expansion': "Voter's Choice: The First Expansion",
  'voters_choice_second_expansion': "Voter's Choice: The Second Expansion",
  'voters_choice_third_expansion': "Voter's Choice: The Third Expansion",
  'voters_choice_fourth_expansion': "Voter's Choice: The Fourth Expansion",

  'words_against_morality_vol_1': 'Words Against Morality: Volume 1',
  'words_against_morality_vol_2': 'Words Against Morality: Volume 2',
  'words_against_morality_vol_3': 'Words Against Morality: Volume 3',
  'words_against_morality_vol_4': 'Words Against Morality: Volume 4',

  'worst_card_game_colorado_ed': 'The Worst Card Game: Colorado Edition',
  'worst_card_game_2016_national_ed': 'The Worst Card Game: 2016 National Edition'
}

module.exports = {
  RANGES,
  PACKNAMES
}