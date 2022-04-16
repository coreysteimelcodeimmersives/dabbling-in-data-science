async function setup() {
    console.log('hello?')
    let jsonFetch = await fetch('ra_top_1000_data_set.json');
    let djData = await jsonFetch.json();
    console.log(djData)
    let labels = [];
    let followersData = [];
    for (entry of djData) {
        if (entry.followers > 30000) {
            labels.push(entry.name);
            console.log("Name: " + entry.name + ' Followers: ' + entry.followers);
            followersData.push(entry.followers);
        }

    }
    const data = {
        labels: labels,
        datasets: [{
            label: 'Number of DJ Followers over 20k in the UK',
            data: followersData,
            backgroundColor: (context) => {
                const chart = context.chart;
                const {
                    ctx,
                    chartArea,
                    scales
                } = chart;
                if (!chartArea) {
                    return null;
                };
                return getGradient(ctx, chartArea, scales);
            },
            borderColor: (context) => {
                const chart = context.chart;
                const {
                    ctx,
                    chartArea,
                    scales
                } = chart;
                if (!chartArea) {
                    return null;
                };
                return getGradient(ctx, chartArea, scales);
            },
            borderWidth: 1
        }]
    }

    const config = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },
    };

    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );

    function getGradient(ctx, chartArea, scales) {
        const gradientBg = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradientBg.addColorStop(0, '#cd7f32');
        gradientBg.addColorStop(.35, '#c0c0c0');
        gradientBg.addColorStop(.65, '#c0c0c0')
        gradientBg.addColorStop(.7, '#ffd700');
        return gradientBg;
    }
}

setup();