


const track = document.getElementById('image-track');

track.dataset.mouseDownAt = '0';
track.dataset.prevPercentage = '0';
track.dataset.percentage = '0';

window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
}

window.onmouseup = () => {
    track.dataset.mouseDownAt = '0';
    
    track.dataset.prevPercentage = track.dataset.percentage || '0';
}

window.onmousemove = e => {
    if(track.dataset.mouseDownAt === '0') return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
          maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100,
          rawNextPercentage = parseFloat(track.dataset.prevPercentage || '0') + percentage;

    const nextPercentage = Math.max(Math.min(rawNextPercentage, 0), -100);


    track.dataset.percentage = nextPercentage;

    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 1200, fill: 'forwards' });
   



    for(const image of track.getElementsByClassName('image')) {
        image.animate({
            objectPosition: `${100 + nextPercentage}% center`
        }, { duration: 1200, fill: 'forwards' });
    }
}

