import {defaultSoundSettings, elements} from "./vars.js";

export class BeatBarsManager {

    constructor(metronomeManager) {
        this.metronomeManager = metronomeManager;
    }

    decreaseBeat() {
        // Удаляем последнюю строку из DOM
        elements.beatsRows[elements.beatsRows.length - 1].remove();

        // Удаляем последний элемент из beat-container
        const lastBeatWrapper = elements.beatContainer.lastElementChild;
        if (lastBeatWrapper) {
            lastBeatWrapper.remove();
        }

        // Обновляем массивы
        this.metronomeManager.soundManager.popSelectedSound();
        this.metronomeManager.soundManager.popSoundSetting();

        // Пересчитываем количество битов
        elements.beatsCounter.textContent = elements.beatWrappers.length;

        // Используем setTimeout, чтобы подождать завершения обновления DOM
        setTimeout(() => {
            this.metronomeManager.elementsManager.updateTimeSignature();
        }, 0);

        // Если метроном запущен, обновляем его
        if (this.metronomeManager.isPlaying) {
            this.metronomeManager.updateMetronomeSequence();
        }

        this.metronomeManager.elementsManager.updateTimeSignature();
    }

    increaseBeat() {
        const beatRows = document.querySelectorAll('.sound-row');

        const newBeatIndex = beatRows.length;

        // Создаём новый элемент и добавляем его на страницу
        this.metronomeManager.elementsManager.createBeatElement(newBeatIndex);

        // Обновляем массивы
        this.metronomeManager.soundManager.addSelectedSound(1); // Звук по умолчанию
        this.metronomeManager.soundManager.addSoundSetting(defaultSoundSettings);

        // Обновляем количество битов
        elements.beatsCounter.textContent = newBeatIndex + 1;

        // Обновляем последовательность метронома без перезапуска
        if (this.metronomeManager.isPlaying) {
            this.metronomeManager.updateMetronomeSequence();
        }

        // Обновляем тактовую сетку (если нужно)
        this.metronomeManager.soundManager.updateTimeSignature();
    }
}