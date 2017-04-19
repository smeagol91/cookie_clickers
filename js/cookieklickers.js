var dataInit = {
    "Cookie God": {"base": "1000000000000000", "cps": "1000000000", "lvl": "0", "calc": 1000000000000000, "ppc": 1000000},
    "Uranium C": {"base": "200000000000", "cps": "1500000", "lvl": "0", "calc": 200000000000, "ppc": 133333.33333333334},
    "RedKrypto-C": {"base": "1600000000000", "cps": "7000000", "lvl": "0", "calc": 1600000000000, "ppc": 228571.42857142858},
    "GrandMa": {"base": "100", "cps": "0.3", "lvl": "0", "calc": 100, "ppc": 333.33333333333337},
    "S-Factory": {"base": "200000", "cps": "20", "lvl": "0", "calc": 200000, "ppc": 10000},
    "Nano Cookie": {"base": "3000000000", "cps": "80000", "lvl": "0", "calc": 3000000000, "ppc": 37500},
    "Virus Cookie": {"base": "10000000000", "cps": "200000", "lvl": "0", "calc": 10000000000, "ppc": 50000},
    "C-Robot": {"base": "1000", "cps": "1", "lvl": "0", "calc": 1000, "ppc": 1000},
    "Moon-C": {"base": "2500000000000", "cps": "10000000", "lvl": "0", "calc": 2500000000000, "ppc": 250000},
    "C-Factory": {"base": "50000", "cps": "6", "lvl": "0", "calc": 50000, "ppc": 8333.333333333334},
    "C-Cloner": {"base": "1000000", "cps": "70", "lvl": "0", "calc": 1000000, "ppc": 14285.714285714286},
    "Krypto-C": {"base": "800000000000", "cps": "4000000", "lvl": "0", "calc": 800000000000, "ppc": 200000},
    "Molecular-C": {"base": "5000000000", "cps": "120000", "lvl": "0", "calc": 5000000000, "ppc": 41666.666666666664},
    "Alien Labs": {"base": "200000000", "cps": "8000", "lvl": "0", "calc": 200000000, "ppc": 25000},
    "AutoClick": {"base": "30", "cps": "0.1", "lvl": "0", "calc": 30, "ppc": 300},
    "Galaxy-C": {"base": "4000000000000", "cps": "15000000", "lvl": "0", "calc": 4000000000000, "ppc": 266666.6666666667},
    "Plutonium C": {"base": "400000000000", "cps": "2500000", "lvl": "0", "calc": 400000000000, "ppc": 160000},
    "Alien C-X": {"base": "1000000000", "cps": "30000", "lvl": "0", "calc": 1000000000, "ppc": 33333.333333333336},
    "Atomic-C": {"base": "30000000", "cps": "1500", "lvl": "0", "calc": 30000000, "ppc": 20000},
    "Proto Cookie": {"base": "20000000000", "cps": "350000", "lvl": "0", "calc": 20000000000, "ppc": 57142.857142857145},
    "CookieFarm": {"base": "10000", "cps": "3.1", "lvl": "0", "calc": 10000, "ppc": 3225.806451612903},
    "Alien Lab v2": {"base": "400000000", "cps": "15000", "lvl": "0", "calc": 400000000, "ppc": 26666.666666666668},
    "Hydrogenic C": {"base": "100000000000", "cps": "1000000", "lvl": "0", "calc": 100000000000, "ppc": 100000},
    "X-Factory": {"base": "500000", "cps": "40", "lvl": "0", "calc": 500000, "ppc": 12500},
    "C-Cern": {"base": "5000000", "cps": "300", "lvl": "0", "calc": 5000000, "ppc": 16666.666666666668},
    "Synaptic C": {"base": "50000000000", "cps": "600000", "lvl": "0", "calc": 50000000000, "ppc": 83333.33333333333},
    "Galaxy-X": {"base": "8000000000000", "cps": "25000000", "lvl": "0", "calc": 8000000000000, "ppc": 320000},
    "Alien Robot": {"base": "70000000", "cps": "3000", "lvl": "0", "calc": 70000000, "ppc": 23333.333333333332},
    "Cookie Hack": {"base": "15000000000000", "cps": "40000000", "lvl": "0", "calc": 15000000000000, "ppc": 375000},
    "Alien Tech": {"base": "600000000", "cps": "20000", "lvl": "0", "calc": 600000000, "ppc": 30000}
};
var ccTable = {
    name2index: {name: 0, lvl: 1, ppc: 2, calc: 3},
    index2name: ['name', 'lvl', 'ppc', 'calc']
};

var cookieClickersNextLevelCalculation = 1.3;

function addEmptyParts(cookies) {
    $.each(dataInit, function (upgrade, values) {
        if (cookies[upgrade] === undefined) {
            cookies[upgrade] = values;
        }
    });

    return cookies;
}

function _save(cookies) {
    localStorage.cookieClickers = JSON.stringify(cookies);
}

function _load() {
    if (!localStorage.cookieClickers) {
        // no localStorage Object, use Init Object
        return recalculateObject(dataInit);
    }

    // localStorage Object, parse the Json String
    var data = JSON.parse(localStorage.cookieClickers);
    return recalculateObject(data);
}

/**
 * after changing level, recalculate active Price and Price per CPS
 * @param {string} cookies
 */
function recalculateObject(cookies) {
    var newPrice = 0;
    var newPPC = 0;
    var cps = 0;
    var lvl = 0;
    $.each(cookies, function (itemName, item) {
        cps = parseFloat(item['cps']);
        lvl = parseInt(item['lvl']);
        newPrice = parseInt(item['base']);
        for (var i = 0; i < lvl; i++) {
            newPrice = Math.floor(newPrice * cookieClickersNextLevelCalculation);
        }
        cookies[itemName]['calc'] = newPrice;
        newPPC = parseFloat(newPrice) / parseFloat(cps);
        cookies[itemName]['ppc'] = newPPC;
    });

    return cookies;
}

/**
 * Change the Level of one Upgrade
 * @param {data} cookies
 * @param {number} newLevel
 * @param {string} upgrade
 */
function changeLevel(cookies, newLevel, upgrade) {
    cookies[upgrade].lvl = newLevel;
    var newCookies = recalculateObject(cookies);
    updateHtmlList(upgrade, newCookies[upgrade]);
    _save(newCookies);
}

/**
 * Opens Infobox about one Upgrade
 * @param {object} cookies
 * @param {string} upgrade - key in `cookies`
 */
function openInfoBox(cookies, upgrade) {
    $('.popup').find('span').each(function (i, e) {
        var dataElement = $(e).attr('value');
        var valueElement = cookies[upgrade][dataElement];
        if (dataElement === 'name') {
            valueElement = upgrade;
        }
        if (parseFloat(valueElement) == valueElement) {
            var withDecimals = (dataElement === 'ppc' || dataElement === 'cps');
            valueElement = formatNumber(valueElement, withDecimals);
        }
        $(e).html(valueElement);
    });
    $('.popup, .bgblack').show();
}

/**
 * Adds all the events to everything
 * @param {data} cookies
 */
function addEvents(cookies) {
    $('#maindata input').on('change click focusout blur', function (ev) {
        var upgrade = $(this).parents('tr').find('td').eq(0).find('a').html();
        var newVal = parseInt($(this).val());
        changeLevel(cookies, newVal, upgrade);
    });
    $('#maindata a').on('click', function (ev) {
        ev.preventDefault();
        var upgrade = $(this).html();
        openInfoBox(cookies, upgrade);
    });
    $('#close, .bgblack').on('click', function (ev) {
        $('.popup, .bgblack').hide();
    });
    $('button[value="addlevel"]').on('click', function (ev) {
        var popup = $(this).parents('.popup');
        var nameVal = getValNameFromPopUp(popup);
        var newVal = parseInt(nameVal[1]) + 1;
        if (isNaN(newVal)) {
            newVal = parseInt(nameVal[1]);
        }
        changeLevel(cookies, newVal, nameVal[0]);
        openInfoBox(cookies, nameVal[0]);
    });
    $('button[value="subtract"]').on('click', function (ev) {
        var popup = $(this).parents('.popup');
        var nameVal = getValNameFromPopUp(popup);
        var newVal = parseInt(nameVal[1]) - 1;
        if (isNaN(newVal) || newVal < 0) {
            newVal = 0;
        }
        changeLevel(cookies, newVal, nameVal[0]);
        openInfoBox(cookies, nameVal[0]);
    });
}

function getValNameFromPopUp(popup) {
    var upgrade = $(popup).find('h5 .title').html();
    var val = $(popup).find('span[value="lvl"]').html();

    return [upgrade, val];
}

/**
 * Updates Single Row in HTML-Table
 * @param {string} upgrade name (key in data)
 * @param {object} data row of data
 */
function updateHtmlList(upgrade, data) {
    $('#maindata a').each(function (i, e) {
        if ($(this).html() === upgrade) {
            var tds = $(this).parents('tr').find('td');
            tds.eq(ccTable.name2index['lvl']).attr('value', data.lvl).find('input').val(data.lvl);
            tds.eq(ccTable.name2index['ppc']).attr('value', data.ppc).html(formatNumber(data.ppc, true));
            tds.eq(ccTable.name2index['calc']).attr('value', data.calc).html(formatNumber(data.calc, false));
            // break
            return false;
        }
    });
}

/**
 * clears rows in html table
 */
function cleanupHtml() {
    $('#maindata tbody tr').each(function (i, e) {
        if (i >= 1) {
            $(this).remove();
        }
    });
}

/**
 * function to write object to html
 * @param {object} cookies
 */
function writeToHtml(cookies) {
    $.each(cookies, function (upgrade, data) {
        var cols = $('#maindata tbody tr').eq(0).find('td');
        var newRow = $('<tr />');
        $.each(cols, function (index, column) {
            var colName = ccTable.index2name[index];
            var newCell = $(column).clone();
            switch (colName) {
                case 'name':
                    $(newCell).find('a').html(upgrade);
                    $(newCell).attr('value', data['base']);
                    break;
                case 'lvl':
                    $(newCell).find('input').val(data.lvl);
                    $(newCell).attr('value', data[colName]);
                    break;
                default:
                    $(newCell).attr('value', data[colName]);
                    $(newCell).html(formatNumber(data[colName], colName === 'ppc'));
            }
            newCell.appendTo(newRow);
        });
        newRow.appendTo('tbody');
    });
    // remove template row
    $('#maindata tbody tr').eq(0).remove();
}

/**
 * function to format a number internal use
 * @see Number.prototype.formatMoney
 * @param {mixed} number - will be parsed as float
 * @param {boolean} decimals - with one dec or without
 * @returns {string}
 */
function formatNumber(number, decimals) {
    var f = parseFloat(number);
    if (decimals) {

        return f.formatMoney(1, '.', ',');
    }

    return f.formatMoney(0, '.', ',');
}

/**
 * function to format Number to string with thousendSeparator and decSeparator
 * @param {int} decPlaces
 * @param {string} thouSeparator default `,`
 * @param {string} decSeparator default `.`
 * @returns {string} Formatted Number as String
 */
Number.prototype.formatMoney = function (decPlaces, thouSeparator, decSeparator) {
    var n = this, decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces, decSeparator = decSeparator === undefined ? "." : decSeparator, thouSeparator = thouSeparator === undefined ? "," : thouSeparator, sign = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
};

jQuery(document).ready(function ($) {
    // load CookieClickers Data
    var cookieClickers = addEmptyParts(_load());
    // reset HTML
    cleanupHtml();
    // write output
    writeToHtml(cookieClickers);
    // save to local Storage
    _save(cookieClickers);
    // sort by Price per CPS
    $('table#maindata').find('tr').first().find('th').eq(2).trigger('click');
    // add Click, Change
    addEvents(cookieClickers);
});